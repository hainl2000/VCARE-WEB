import { CreateFormProps } from "@/type/common.interface";
import { useRequest } from "ahooks";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  message,
} from "antd";
import React from "react";
import { createMedicalService } from "./service";

const CreateMedicalService = ({
  open,
  setOpen,
  refresh,
  id,
}: CreateFormProps) => {
  const [form] = Form.useForm();
  const create = useRequest(createMedicalService, {
    manual: true,
    onSuccess: (res) => {
      message.success("Thành công");
      form.resetFields();
      setOpen(false);
      refresh();
    },
    onError: (err) => {
      message.error("Có lỗi xảy ra");
    },
  });
  const onCancel = () => {
    setOpen(false);
  };
  const onFinish = (val: any) => {
    create.run({
      ...val,
      service_id: Number(id),
    });
  };
  return (
    <Modal
      // width={800}
      open={open}
      onCancel={onCancel}
      title="Tạo dịch vụ khám"
      footer={null}
    >
      <Form onFinish={onFinish}>
        <Form.Item name="name" label="Tên dịch vụ">
          <Input placeholder="Nhập tên dịch vụ" />
        </Form.Item>
        <Form.Item name="room" label="Mã số phòng">
          <Input placeholder="Nhập mã số phòng khám" />
        </Form.Item>
        <Form.Item name="fee" label="Giá khám">
          <InputNumber placeholder="Nhập giá dịch vụ" />
        </Form.Item>
        <Form.Item>
          <Row justify="end">
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateMedicalService;
