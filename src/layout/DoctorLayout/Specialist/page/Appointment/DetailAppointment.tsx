import { useRequest } from "ahooks";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { getDetailAppointment } from "./service";
import styles from "./index.module.scss";
import { Card, Form, Input, Space, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import Link from "next/link";
const DetailAppointment = () => {
  const router = useRouter();
  const { id } = router.query;
  const [form] = Form.useForm();
  const detailAppointment = useRequest(
    getDetailAppointment,
    {
      manual: true,
      onSuccess(res) {
        console.log(res.data);
        form.setFieldsValue({
          ...res.data.patient_information,
        });
      },
    }
  );
  useEffect(() => {
    if (id) {
      detailAppointment.run(Number(id));
    }
  }, [id]);
  return (
    <div className={styles.detailAppointment}>
      <div className={styles.title}>
        <Typography>
          <Typography.Title level={5}>
            <Link
              href="/doctor/specialist/appointment"
              style={{
                color: "black",
              }}
            >
              <Space>
                <LeftOutlined
                  style={{
                    marginRight: "5px",
                  }}
                />
                Chi tiết thông tin đặt khám
              </Space>
            </Link>
          </Typography.Title>
        </Typography>
        <Card title="Thông tin bệnh nhân">
          <Form form={form} layout="horizontal">
            <Form.Item label="Họ và tên" name="full_name">
              <Input
                readOnly
                style={{
                  border: "none",
                }}
              />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phone">
              <Input
                readOnly
                style={{
                  border: "none",
                }}
              />
            </Form.Item>
            <Form.Item
              label="Số thẻ bảo hiểm y tế"
              name="social_insurance_number"
            >
              <Input
                readOnly
                style={{
                  border: "none",
                }}
              />
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default DetailAppointment;
