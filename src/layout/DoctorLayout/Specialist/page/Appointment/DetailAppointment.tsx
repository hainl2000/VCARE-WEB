import { useRequest } from "ahooks";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  getAllMedicalServices,
  getDetailAppointment,
  updateAppointmentService,
} from "./service";
import styles from "./index.module.scss";
import {
  Button,
  Card,
  Form,
  Image,
  Input,
  Row,
  Select,
  Space,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { formatNumber } from "@/utils/helper";
import { getCookie } from "cookies-next";
const DetailAppointment = () => {
  const [totalFee, setTotalFee] = useState(0);
  const router = useRouter();
  const { id } = router.query;
  const [form] = Form.useForm();
  const [formAddService] = Form.useForm();
  const onChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
  };
  const [fileList, setFileList] = useState<UploadFile[]>(
    []
  );
  const tokenDotor = getCookie("accessTokenDoctor");
  const detailAppointment = useRequest(
    getDetailAppointment,
    {
      manual: true,
      onSuccess(res) {
        console.log(res.data);
        form.setFieldsValue({
          ...res.data.patient_information,
          medical_condition: res.data.medical_condition,
        });
      },
    }
  );
  const updateAppointment = useRequest(
    updateAppointmentService,
    {
      manual: true,
      onSuccess(res) {
        message.success("Cập nhật thành công");
        detailAppointment.refresh();
      },
      onError(err) {
        message.error("Lỗi");
      },
    }
  );
  const medicalServices = useRequest(
    getAllMedicalServices,
    {
      debounceWait: 1000,
      onSuccess: (res) => {},
    }
  );
  const onFinishAppoitment = (val: any) => {
    updateAppointment.run(Number(id), {
      finished: true,
      ...val,
      medicine: val.medicine?.file?.response?.url,
    });
  };
  const onAddService = (val: any) => {
    updateAppointment.run(Number(id), {
      ...val,
    });
  };
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
            <Form.Item
              label="Triệu chứng khám"
              name="medical_condition"
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
        {detailAppointment.data?.data?.services?.length ===
          0 && (
          <Card title="Các dịch vụ cần khám">
            <Form
              form={formAddService}
              layout="vertical"
              onFinish={onAddService}
            >
              <Form.Item
                label="Chọn các dịch vụ"
                name="services"
              >
                <Select
                  style={{
                    width: "300px",
                  }}
                  placeholder="Chọn các dịch vụ"
                  mode="multiple"
                  options={medicalServices.data?.data?.data?.map(
                    (item: any) => ({
                      value: item.id,
                      label: item.name,
                      key: item.id,
                      fee: item.fee,
                    })
                  )}
                  onChange={(val, option) => {
                    const fee = option.reduce(
                      (pre: any, cur: any) => {
                        return pre + cur.fee;
                      },
                      0
                    );
                    setTotalFee(fee);
                  }}
                  allowClear
                  showSearch
                  filterOption={false}
                  onSearch={(val) =>
                    medicalServices.run(val)
                  }
                ></Select>
              </Form.Item>
              <div>
                <span>
                  Tổng chi phí khám:{" "}
                  <b>{formatNumber(totalFee)}</b>
                  {" VND"}
                </span>
              </div>
              <Row
                justify="start"
                style={{
                  margin: "20px 0",
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={updateAppointment.loading}
                >
                  Xác nhận
                </Button>
              </Row>
            </Form>
          </Card>
        )}
        {detailAppointment.data?.data?.services?.length >
          0 && (
          <>
            <Card title="Kết quả khám dịch vụ">
              {detailAppointment.data?.data?.services?.map(
                (item: any) => (
                  <div
                    style={{
                      marginBottom: "15px",
                    }}
                  >
                    <p
                      style={{
                        marginBottom: "15px",
                      }}
                    >
                      {item.service?.name}
                    </p>
                    <Image.PreviewGroup>
                      {item?.result_image?.map(
                        (img: any) => (
                          <Image
                            src={img}
                            style={{
                              width: "150px",
                              height: "150px",
                            }}
                          />
                        )
                      )}
                    </Image.PreviewGroup>
                  </div>
                )
              )}
            </Card>
            <Card title="Kết luận và đơn thuốc">
              <Form
                onFinish={onFinishAppoitment}
                disabled={
                  detailAppointment?.data?.data?.finished
                }
              >
                <Form.Item name="conclude" label="Kết luận">
                  <Input.TextArea
                    rows={3}
                    placeholder="Nhập kết luận"
                  />
                </Form.Item>
                <Form.Item
                  name="medicine"
                  label="Đơn thuốc"
                >
                  <Upload
                    accept=".png,.jpg,.jpeg"
                    action={
                      process.env.NEXT_PUBLIC_API_URL +
                      "/upload"
                    }
                    headers={{
                      Authorization: `Bearer ${tokenDotor}`,
                    }}
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                  >
                    {fileList.length < 5 && "Kết quả khám"}
                  </Upload>
                </Form.Item>
                <Form.Item name="note" label="Ghi chú">
                  <Input.TextArea
                    rows={3}
                    placeholder="Nhập ghi chú"
                  />
                </Form.Item>
                {!detailAppointment.data?.data
                  ?.finished && (
                  <Row justify="center">
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={updateAppointment.loading}
                    >
                      Hoàn thành đơn khám
                    </Button>
                  </Row>
                )}
              </Form>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailAppointment;
