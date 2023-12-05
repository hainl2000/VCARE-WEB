import { useRequest } from "ahooks";
import React from "react";
import { createDepartmentService } from "./service";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  message,
} from "antd";
import { CreateFormProps } from "@/type/common.interface";

const CreateDepartmentForm = ({
  open,
  setOpen,
  refresh,
}: CreateFormProps) => {
  const [form] = Form.useForm();
  const createDepartment = useRequest(
    createDepartmentService,
    {
      manual: true,
      onSuccess(res) {
        message.success("Thêm thành công");
        setOpen(false);
        form.resetFields();
        refresh();
      },
    }
  );
  const onCancel = () => {
    setOpen(false);
  };
  const onFinish = (values: any) => {
    createDepartment.run(values);
  };
  return (
    <Modal
      width={800}
      open={open}
      onCancel={onCancel}
      title="Thêm phòng khám"
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item name="name" label="Tên phòng khám">
          <Input placeholder="Nhập tên phòng khám" />
        </Form.Item>

        <Form.Item
          name="time_per_turn"
          label="Thời gian mỗi lần khám"
          initialValue={5}
        >
          <InputNumber
            addonAfter="Phút"
            placeholder="Thời gian"
          />
        </Form.Item>
        <Form.Item name="room" label="Số phòng">
          <Input placeholder="Mã số phòng" />
        </Form.Item>
        <Row justify="end">
          <Button
            type="primary"
            htmlType="submit"
            loading={createDepartment.loading}
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

export default CreateDepartmentForm;
