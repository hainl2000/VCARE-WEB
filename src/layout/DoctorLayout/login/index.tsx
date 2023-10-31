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
import { loginDoctorService } from "./service";
import { setCookie } from "cookies-next";
import { useRequest } from "ahooks";

const DoctorLogin = () => {
  const [form] = Form.useForm();

  const router = useRouter();
  const { setProfileAdmin } = useProfile();
  const login = useRequest(loginDoctorService, {
    manual: true,
    onSuccess: (res) => {
      console.log(res.data);
      setCookie("doctorProfile", res?.data?.profile);
      setCookie("accessTokenDoctor", res?.data?.token);
      switch (res.data.profile.drole.id) {
        case 1: {
          router.push("/doctor/reception/appointment");
          break;
        }
        case 2: {
          router.push("/doctor/specialist/appointment");
          break;
        }
        case 3: {
          router.push("/doctor/services");
          break;
        }
        default: {
          break;
        }
      }
      //  setCookie("adminId", res?.data?.profile.id);
      //  setCookie("adminProfile", res?.data?.profile);
      //  setCookie("accessTokenAdmin", res?.data?.token);
      //  setProfileAdmin(res?.data?.profile);
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
        <div className={styles.logo}>
          <img
            src="/images/logo-vcare.png"
            alt="logo"
            style={{
              width: "200px",
              height: "200px",
            }}
          />
        </div>
        <p
          style={{
            fontWeight: 600,
            fontSize: "24px",
            textAlign: "center",
          }}
        >
          ĐĂNG NHẬP BÁC SĨ VCARE
        </p>
        <Form
          onFinish={onSubmit}
          form={form}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 24,
          }}
          layout="vertical"
          labelAlign="left"
        >
          <Form.Item
            label="Tài khoản"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tài khoản",
              },
            ]}
          >
            <Input placeholder="Nhập email hoặc số điện thoại" />
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

export default DoctorLogin;
