import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Row,
  Skeleton,
  Tabs,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import { useRequest } from "ahooks";
import {
  getAppointmentService,
  updateAppointmentService,
} from "./service";
import { getCookie } from "cookies-next";
import { RcFile } from "antd/lib/upload";
import UploadResult from "./UploadResult";

const DoctorServiceAppointment = () => {
  const [form] = Form.useForm();
  const [formService] = Form.useForm();
  const [doctor, setDoctor] = useState<any>();
  const [selectedServiceId, setSelectedServiceId] =
    useState(0);

  const [disabled, setDisabled] = useState(true);

  const appointment = useRequest(getAppointmentService, {
    manual: true,
    onSuccess: (res) => {
      console.log(res.data);
      setDisabled(false);
      form.setFieldsValue(res.data.patient_information);
      setSelectedServiceId(
        res.data?.services?.[0]?.service?.id
      );
    },
    onError: (err) => {
      form.resetFields();
      setDisabled(true);
    },
  });

  useEffect(() => {
    if (getCookie("doctorProfile")) {
      const doctorProfile = JSON.parse(
        getCookie("doctorProfile") as string
      );
      setDoctor(doctorProfile);
    }
  }, []);

  return (
    <>
      <Typography>
        <Typography.Title level={4}>
          {doctor?.service?.name}
        </Typography.Title>
      </Typography>
      <div className={styles.wrapper}>
        <Card
          title="Đơn khám"
          className={styles.appointment}
        >
          <Input.Search
            placeholder="Tìm kiếm theo mã đơn khám"
            style={{
              width: "60%",
            }}
            allowClear
            onSearch={(val) => {
              appointment.run(val);
            }}
          />
          {appointment.loading ? (
            <Skeleton active />
          ) : (
            appointment.data && (
              <>
                <Card
                  title="Thông tin đơn khám"
                  style={{
                    margin: "20px 0",
                  }}
                >
                  {appointment.data.data ? (
                    <Form
                      layout="vertical"
                      form={form}
                      disabled={disabled}
                    >
                      <Form.Item
                        name="full_name"
                        label="Họ và tên"
                      >
                        <Input readOnly />
                      </Form.Item>
                      <Form.Item
                        name="phone"
                        label="Số điện thoại"
                      >
                        <Input readOnly />
                      </Form.Item>
                    </Form>
                  ) : (
                    <p className="red-color">
                      Không tìm thấy đơn khám
                    </p>
                  )}
                </Card>
                <Card title="Dịch vụ cần khám">
                  <Tabs
                    onChange={(key) =>
                      setSelectedServiceId(+key)
                    }
                  >
                    {appointment.data.data?.services?.map(
                      (item: any) => (
                        <Tabs.TabPane
                          tab={item.service?.name}
                          key={item?.service?.id}
                        >
                          <UploadResult
                            refresh={appointment.refresh}
                            appointmentId={
                              appointment.data?.data?.id
                            }
                            serviceId={selectedServiceId}
                          />
                        </Tabs.TabPane>
                      )
                    )}
                  </Tabs>
                </Card>
                <Row justify="center">
                  <Button
                    type="primary"
                    ghost
                    danger
                    onClick={() => window.location.reload()}
                  >
                    Hoàn thành
                  </Button>
                </Row>
              </>
            )
          )}
        </Card>
      </div>
    </>
  );
};

export default DoctorServiceAppointment;
