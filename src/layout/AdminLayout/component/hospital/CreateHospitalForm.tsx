import { useRequest } from "ahooks";
import {
  Button,
  Form,
  Input,
  Modal,
  Row,
  message,
  notification,
} from "antd";
import React, { Dispatch } from "react";
import { createHospitalService } from "./service";
interface CreateHospitalProps {
  open: boolean;
  setOpen: any;
  refresh: () => void;
}
const CreateHospitalForm = ({
  open,
  setOpen,
  refresh,
}: CreateHospitalProps) => {
  const onCancel = () => {
    setOpen(false);
  };
  const [form] = Form.useForm();
  const createHospital = useRequest(createHospitalService, {
    manual: true,
    onSuccess(res) {
      refresh();
      setOpen(false);
      notification.success({
        message: "Thêm thành công",
      });
    },
    onError(e: any) {
      //@ts-ignore
      console.log(e);
      message.error(e?.response?.data?.message[0]);
    },
  });
  const onFinish = (values: any) => {
    console.log(values);
    createHospital.run(values);
  };
  return (
    <Modal
      width={800}
      open={open}
      onCancel={onCancel}
      title="Tạo bệnh viện"
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Tên bệnh viện"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập",
            },
          ]}
        >
          <Input placeholder="Nhập tên bệnh viện" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập",
            },
          ]}
        >
          <Input placeholder="Nhập địa chỉ" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
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
          name="phone"
          label="Số điện thoại"
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
          name="password"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập",
            },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>
        <Row justify="end">
          <Button
            type="primary"
            htmlType="submit"
            loading={createHospital.loading}
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

export default CreateHospitalForm;
