import { CreateFormProps } from "@/type/common.interface";
import { useRequest } from "ahooks";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  createDoctorService,
  getAllDepartments,
  getAllHospitalServices,
  getListDoctorRoles,
} from "./service";

const CreateDoctorForm = ({
  open,
  setOpen,
  refresh,
}: CreateFormProps) => {
  const [form] = Form.useForm();
  const [listRole, setListRole] = useState([]);
  const [roleDoctor, setRoleDoctor] = useState();
  const [listDepartment, setListDepartment] = useState([]);
  const [listService, setListService] = useState([]);
  const createDoctor = useRequest(createDoctorService, {
    manual: true,
    onSuccess(res) {
      message.success("Thêm thành công");
      setOpen(false);
      form.resetFields();
      refresh();
    },
    onError(err: any) {
      message.error(err?.response?.data?.message[0]);
    },
  });
  const getListRole = useRequest(getListDoctorRoles, {
    onSuccess(res) {
      setListRole(res.data.data);
    },
  });
  const getListDepartments = useRequest(getAllDepartments, {
    manual: true,
    onSuccess(res) {
      setListDepartment(res.data.data);
    },
  });
  const getListService = useRequest(
    getAllHospitalServices,
    {
      manual: true,
      onSuccess(res) {
        setListService(res.data.data);
      },
    }
  );
  const onCancel = () => {
    setOpen(false);
  };
  const onFinish = (value: any) => {
    createDoctor.run(value);
  };
  const renderRole = (role: string) => {
    switch (role) {
      case "reception":
        return "Điều phối viên";
      case "specialis":
        return "Bác sĩ chuyên khoa";
      case "service":
        return "Bác sĩ xét nghiệm";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (roleDoctor === 2) {
      getListDepartments.run();
    }
    if (roleDoctor === 3) {
      getListService.run();
    }
  }, [roleDoctor]);

  return (
    <Modal
      width={800}
      open={open}
      onCancel={onCancel}
      title="Tạo bác sĩ"
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row justify="space-between">
          <Col span={11} lg={11} sm={24} xs={24}>
            <Form.Item
              label="Tên bác sĩ"
              name="full_name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập",
                },
              ]}
            >
              <Input placeholder="Họ tên bác sĩ" />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập",
                },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
            <Form.Item
              label="Mã bác sĩ"
              name="code"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập",
                },
              ]}
            >
              <Input placeholder="Nhập mã bác sĩ" />
            </Form.Item>
          </Col>
          <Col span={11} lg={11} sm={24} xs={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập",
                },
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
            <Form.Item
              label="Mã chứng chỉ"
              name="practicing_certificate_code"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập",
                },
              ]}
            >
              <Input placeholder="Nhập mã chứng chỉ hành nghề" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Vai trò">
          <Radio.Group
            onChange={(e) => setRoleDoctor(e.target.value)}
          >
            {listRole.map((item: any) => (
              <Radio key={item.id} value={item.id}>
                {renderRole(item.name)}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        {roleDoctor === 2 && (
          <Col span={11} lg={11} sm={24} xs={24}>
            <Form.Item
              name="department_id"
              rules={[
                {
                  required: true,
                  message:
                    "Vui lòng chọn chuyên khoa cho bác sĩ",
                },
              ]}
            >
              <Select placeholder="Chọn chuyên khoa">
                {listDepartment.map((item: any) => (
                  <Select.Option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        )}
        {roleDoctor === 3 && (
          <Col span={11} lg={11} sm={24} xs={24}>
            <Form.Item
              name="service_id"
              rules={[
                {
                  required: true,
                  message:
                    "Vui lòng chọn dịch vụ cho bác sĩ",
                },
              ]}
            >
              <Select placeholder="Chọn dịch vụ">
                {listService.map((item: any) => (
                  <Select.Option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        )}
        <Row>
          <Col span={11} lg={11} sm={24} xs={24}>
            <Form.Item label="Mật khẩu" name="password">
              <Input.Password placeholder="Nhập mật khẩu cho tài khoản" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Button
            type="primary"
            htmlType="submit"
            loading={createDoctor.loading}
            style={{
              margin: "0 10px",
              padding: "0 10px",
            }}
          >
            Xác nhận
          </Button>
          <Button
            danger
            onClick={onCancel}
            style={{
              margin: "0 15px",
              padding: "0 15px",
            }}
          >
            Hủy
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateDoctorForm;
