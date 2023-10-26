import { CreateFormProps } from "@/type/common.interface";
import { useRequest } from "ahooks";
import {
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  message,
} from "antd";
import React, { useState } from "react";
import {
  createDoctorService,
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
  const createService = useRequest(createDoctorService, {
    manual: true,
    onSuccess(res) {
      message.success("Thêm thành công");
      setOpen(false);
      form.resetFields();
      refresh();
    },
  });
  const getListRole = useRequest(getListDoctorRoles, {
    onSuccess(res) {
      setListRole(res.data.data);
    },
  });
  const onCancel = () => {
    setOpen(false);
  };
  const onFinish = (value: any) => {
    console.log(value);
  };

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
          <Col span={11}>
            <Form.Item
              label="Tên bác sĩ"
              name="name"
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
          <Col span={11}>
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
              <Radio value={item.id}>{item.name}</Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateDoctorForm;
