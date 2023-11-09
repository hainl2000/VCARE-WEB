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
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const DoctorServiceAppointment = () => {
  const [form] = Form.useForm();
  const [doctor, setDoctor] = useState<any>();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [disabled, setDisabled] = useState(true);
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(
        file.originFileObj as RcFile
      );
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name ||
        file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };
  const [fileList, setFileList] = useState<UploadFile[]>(
    []
  );
  const onChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
  };
  const appointment = useRequest(getAppointmentService, {
    manual: true,
    onSuccess: (res) => {
      console.log(res.data);
      setDisabled(false);
      form.setFieldsValue(res.data.patient_information);
    },
    onError: (err) => {
      form.resetFields();
      setDisabled(true);
    },
  });
  const updateAppointment = useRequest(
    updateAppointmentService,
    {
      manual: true,
      onSuccess: (res) => {
        message.success(
          "Cập nhật thành công kết quả khám!"
        );
        setDisabled(true);
      },
      onError: (err) => {
        message.error("Có lỗi xảy ra");
      },
    }
  );
  const tokenDotor = getCookie("accessTokenDoctor");
  const onFinish = (val: any) => {
    const payload = {
      service_id: doctor.service?.id,
      appointment_id: appointment.data?.data?.id,
      result_image: fileList.map(
        (item) => item.response?.url
      ),
    };
    updateAppointment.run(payload);
  };
  useEffect(() => {
    const doctorProfile = JSON.parse(
      getCookie("doctorProfile") as string
    );
    setDoctor(doctorProfile);
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
                    onFinish={onFinish}
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
                    <Form.Item
                      name="result_image"
                      rules={[
                        {
                          required: true,
                          message:
                            "Vui lòng tải lên kết quả khám",
                        },
                      ]}
                    >
                      <Upload
                        className="avatar-uploader"
                        style={{
                          width: "200px",
                          height: "200px",
                        }}
                        accept=".png,.jpg,.jpeg"
                        action={
                          process.env.NEXT_PUBLIC_API_URL +
                          "/upload"
                        }
                        onPreview={handlePreview}
                        headers={{
                          Authorization: `Bearer ${tokenDotor}`,
                        }}
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                      >
                        {fileList.length < 5 &&
                          "Kết quả khám"}
                      </Upload>
                    </Form.Item>
                    <Form.Item>
                      <Row justify="center">
                        <Button
                          type="primary"
                          htmlType="submit"
                        >
                          Kết thúc khám
                        </Button>
                      </Row>
                    </Form.Item>
                  </Form>
                ) : (
                  <p className="red-color">
                    Không tìm thấy đơn khám
                  </p>
                )}
              </Card>
            )
          )}
        </Card>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            style={{ width: "100%" }}
            src={previewImage}
          />
        </Modal>
      </div>
    </>
  );
};

export default DoctorServiceAppointment;
