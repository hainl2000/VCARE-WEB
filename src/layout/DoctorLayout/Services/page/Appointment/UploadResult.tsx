import { useRequest } from "ahooks";
import {
  Button,
  Form,
  Modal,
  Row,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import { RcFile } from "antd/lib/upload";
import { getCookie } from "cookies-next";
import React, { useState } from "react";
import {
  getAppointmentService,
  updateAppointmentService,
} from "./service";
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const UploadResult = ({
  appointmentId,
  serviceId,
  refresh,
}: any) => {
  const [fileList, setFileList] = useState<UploadFile[]>(
    []
  );
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
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
  const updateAppointment = useRequest(
    updateAppointmentService,
    {
      manual: true,
      onSuccess: (res) => {
        message.success(
          "Cập nhật thành công kết quả khám!"
        );
        //   refresh();
      },
      onError: (err) => {
        message.error("Có lỗi xảy ra");
      },
    }
  );
  const onFinish = (val: any) => {
    const payload = {
      service_id: serviceId,
      appointment_id: appointmentId,
      result_image: fileList.map(
        (item) => item.response?.url
      ),
    };
    updateAppointment.run(payload);
  };
  const onChange: UploadProps["onChange"] = ({
    fileList: newFileList,
    file,
  }) => {
    console.log(file, newFileList);
    setFileList(newFileList);
    const checkUpload = newFileList?.every(
      (file) => file?.status === "done"
    );
    if (checkUpload) {
      const payload = {
        service_id: serviceId,
        appointment_id: appointmentId,
        result_image: newFileList?.map(
          (item) => item.response?.url
        ),
      };
      updateAppointment.run(payload);
    }
  };
  const tokenDotor = getCookie("accessTokenDoctor");

  return (
    <>
      <Form onFinish={onFinish}>
        <Form.Item
          name="result_image"
          rules={[
            {
              required: true,
              message: "Vui lòng tải lên kết quả khám",
            },
          ]}
        >
          <Upload
            className="avatar-uploader"
            style={{
              width: "200px",
              height: "200px",
            }}
            accept=".png,.jpg,.jpeg, .xlsx, .xls"
            action={
              process.env.NEXT_PUBLIC_API_URL + "/upload"
            }
            onPreview={handlePreview}
            headers={{
              Authorization: `Bearer ${tokenDotor}`,
            }}
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
          >
            {fileList.length < 1 && "Kết quả khám"}
          </Upload>
        </Form.Item>
        {/* <Form.Item>
          <Row justify="center">
            <Button
              type="primary"
              htmlType="submit"
              loading={updateAppointment.loading}
            >
              Tải lên kết quả khám
            </Button>
          </Row>
        </Form.Item> */}
      </Form>
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
    </>
  );
};

export default UploadResult;
