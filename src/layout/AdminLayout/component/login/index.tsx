import {
  Button,
  Form,
  Input,
  Row,
  notification,
} from "antd";
import React from "react";
import styles from "./index.module.scss";
import { useRequest } from "ahooks";

const AdminLogin = () => {
  const [form] = Form.useForm();

  const onSubmit = (value: any) => {
    form.resetFields();
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formLogin}>
        <p
          style={{
            fontWeight: 600,
            fontSize: "20px",
            textAlign: "center",
          }}
        >
          ADMIN VCARE
        </p>
        <Form
          onFinish={onSubmit}
          form={form}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          labelAlign="left"
        >
          <Form.Item label="Admin" name="username">
            <Input placeholder="Tên đăng nhập" />
          </Form.Item>
          <Form.Item label="Mật khẩu" name="password">
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>
          <Row justify="center">
            <Button
              type="primary"
              htmlType="submit"
              className={styles.btnLogin}
            >
              Đăng nhập
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default AdminLogin;
