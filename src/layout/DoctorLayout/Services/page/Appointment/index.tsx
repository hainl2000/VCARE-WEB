import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import {
  Button,
  Card,
  Form,
  Input,
  Row,
  Skeleton,
  Tabs,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
  message,
  Modal,
} from "antd";
import { useRequest } from "ahooks";
import {
  getAppointmentService,
  updateAppointmentService,
} from "./service";
import { getCookie } from "cookies-next";
import { RcFile } from "antd/lib/upload";
import UploadResult from "./UploadResult";

const DoctorServiceAppointment = ({
  appointment,
  isOpen,
  setIsOpen,
  refresh,
}: {
  appointment: any;
  isOpen: boolean;
  setIsOpen: any;
  refresh: () => void;
}) => {
  const [form] = Form.useForm();
  const [formService] = Form.useForm();
  const [doctor, setDoctor] = useState<any>();
  const [selectedServiceId, setSelectedServiceId] =
    useState(0);

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (getCookie("doctorProfile")) {
      const doctorProfile = JSON.parse(
        getCookie("doctorProfile") as string
      );
      setDoctor(doctorProfile);
    }
    setDisabled(false);
    form.setFieldsValue(appointment.patient_information);
    setSelectedServiceId(
      appointment.services?.[0]?.service?.id
    );
  }, [appointment]);

  return (
    <>
      <Modal
        title="Tải lên kết quả khám"
        open={isOpen}
        width={800}
        onCancel={() => setIsOpen(false)}
        footer={null}
      >
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
            <Card
              title="Thông tin đơn khám"
              style={{
                margin: "20px 0",
              }}
            >
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
            </Card>
            <Card title="Dịch vụ cần khám">
              <Tabs
                onChange={(key) =>
                  setSelectedServiceId(+key)
                }
              >
                {appointment.services?.map((item: any) => (
                  <Tabs.TabPane
                    tab={item.service?.name}
                    key={item?.service?.id}
                  >
                    <UploadResult
                      // refresh={appointment.}
                      appointmentId={appointment.id}
                      serviceId={selectedServiceId}
                    />
                  </Tabs.TabPane>
                ))}
              </Tabs>
            </Card>
            <Row justify="center">
              <Button
                type="primary"
                ghost
                danger
                onClick={() => {
                  refresh();
                  setIsOpen(false);
                }}
              >
                Hoàn thành
              </Button>
            </Row>
          </Card>
        </div>
      </Modal>
    </>
  );
};

export default DoctorServiceAppointment;
