import React from "react";
import { CreateFormProps } from "@/type/common.interface";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Space,
  message,
} from "antd";
import { useRequest } from "ahooks";
import { createServiceHospital } from "./service";
import {
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
const CreateServiceForm = ({
  open,
  setOpen,
  refresh,
}: CreateFormProps) => {
  const [form] = Form.useForm();
  const createService = useRequest(createServiceHospital, {
    manual: true,
    onSuccess(res) {
      message.success("Thêm thành công");
      setOpen(false);
      form.resetFields();
      refresh();
    },
  });
  const onCancel = () => {
    setOpen(false);
  };
  const onFinish = (value: any) => {
    //  console.log(value);

    createService.run({
      ...value,
    });
  };
  return (
    <Modal
      width={400}
      open={open}
      onCancel={onCancel}
      title="Thêm dịch vụ"
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item label="Tên dịch vụ" name="name">
          <Input placeholder="Nhập tên dịch vụ khám" />
        </Form.Item>

        {/* <span>Những chỉ số cần khám</span>
        <Form.List name="template">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "key"]}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập",
                      },
                    ]}
                  >
                    <Input placeholder="Chỉ số" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "value"]}
                  >
                    <Input
                      placeholder="Mô tả ngắn"
                      style={{
                        width: "300px",
                      }}
                    />
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={() => remove(name)}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{
                    width: "150px",
                  }}
                  block
                  icon={<PlusOutlined />}
                >
                  Thêm
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List> */}
        <Row justify="end">
          <Button
            type="primary"
            htmlType="submit"
            loading={createService.loading}
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

export default CreateServiceForm;
