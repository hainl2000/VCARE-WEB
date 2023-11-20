import { DetailFormProps } from "@/type/common.interface";
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
  Upload,
  UploadFile,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  getAllDepartments,
  getAllHospitalServices,
  getDetailDoctorService,
  getListDoctorRoles,
  updateDoctorService,
} from "./service";
import { EditFilled } from "@ant-design/icons";
import { getCookie } from "cookies-next";
import { RcFile, UploadProps } from "antd/lib/upload";

const DetailDoctorForm = ({
  open,
  setOpen,
  refresh,
  id,
}: DetailFormProps) => {
  const [form] = Form.useForm();
  const [listRole, setListRole] = useState([]);
  const [roleDoctor, setRoleDoctor] = useState();
  const [listDepartment, setListDepartment] = useState([]);
  const [listService, setListService] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [fileList, setFileList] = useState<UploadFile[]>(
    []
  );
  const tokenHospital = getCookie("accessTokenHospital");
  const detailDoctor = useRequest(getDetailDoctorService, {
    manual: true,
    onSuccess(res) {
      console.log(res.data);
      form.setFieldsValue({
        ...res.data,
      });
      setRoleDoctor(res.data.role_id);
      if (res.data.avatar) {
        setFileList([
          {
            uid: "-1",
            name: "image1.png",
            status: "done",
            url: res.data?.avatar,
          },
        ]);
      }
    },
  });
  const updateDoctor = useRequest(updateDoctorService, {
    manual: true,
    onSuccess(res) {
      message.success("Sửa thông tin thành công");
      setOpen(false);
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
  const onChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () =>
          resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const onCancel = () => {
    setOpen(false);
  };
  const onFinish = (value: any) => {
    updateDoctor.run({
      ...value,
      doctor_id: id,
      avatar: value.avatar?.file
        ? value.avatar.file?.response?.url
        : detailDoctor.data?.data?.avatar,
    });
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
    detailDoctor.run(id);
  }, [id]);
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
      <Button
        icon={<EditFilled />}
        onClick={() => setDisabled(!disabled)}
      ></Button>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        disabled={disabled}
      >
        <Row justify="center">
          <Form.Item name="avatar">
            <Upload
              className="avatar-uploader"
              style={{
                width: "200px",
                height: "200px",
              }}
              accept=".png,.jpg,.jpeg"
              action={
                process.env.NEXT_PUBLIC_API_URL + "/upload"
              }
              headers={{
                Authorization: `Bearer ${tokenHospital}`,
              }}
              onPreview={onPreview}
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
            >
              {fileList.length < 1 && "Ảnh đại diện"}
            </Upload>
          </Form.Item>
        </Row>
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
        <Form.Item label="Vai trò" name="role_id">
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

        {!disabled && (
          <Row justify="end">
            <Button
              type="primary"
              htmlType="submit"
              loading={updateDoctor.loading}
              style={{
                margin: "0 10px",
                padding: "0 10px",
              }}
            >
              Lưu
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
        )}
      </Form>
    </Modal>
  );
};

export default DetailDoctorForm;
