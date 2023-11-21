import {
  Button,
  Form,
  Input,
  Row,
  message,
  notification,
} from "antd";
import React from "react";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { useProfile } from "@/store/ManagerProfile/useProfile";
import { loginAdmin } from "./service";
import { setCookie } from "cookies-next";
import { useRequest } from "ahooks";

const AdminLogin = () => {
  const [form] = Form.useForm();

  const router = useRouter();
  const { setProfileAdmin } = useProfile();
  const login = useRequest(loginAdmin, {
    manual: true,
    onSuccess: (res) => {
      router.push("/admin/hospital-management");
      console.log(res.data);
      setCookie("adminId", res?.data?.profile.id, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });
      setCookie("adminProfile", res?.data?.profile, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });
      setCookie("accessTokenAdmin", res?.data?.token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });
      setProfileAdmin(res?.data?.profile);
      notification.success({
        message: "Đăng nhập thành công",
      });
    },
    onError: (e: any) => {
      //@ts-ignore
      console.log(e);
      message.error(e?.response?.data?.message[0]);
    },
  });
  const onSubmit = (value: any) => {
    login.run(value);
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
          <Form.Item
            label="Admin"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tài khoản",
              },
            ]}
          >
            <Input placeholder="Tên đăng nhập" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu",
              },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>
          <Row justify="center">
            <Button
              type="primary"
              htmlType="submit"
              className={styles.btnLogin}
              loading={login.loading}
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
