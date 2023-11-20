import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import styles from "./index.module.scss";
import { useAntdTable, useRequest } from "ahooks";
import {
  assignAppointment,
  getAppointmentService,
} from "./service";
import { ColumnsType } from "antd/lib/table";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
const AppointmentSpecialist = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { tableProps, search } = useAntdTable(
    getAppointmentService,
    {
      form,
    }
  );
  const { submit } = search;
  const [appointmentId, setAppointmentId] = useState();
  const assign = useRequest(assignAppointment, {
    manual: true,
    onSuccess: (res) => {
      message.success("Đã tiếp nhận đơn khám!");
      router.push(
        `/doctor/specialist/appointment/${appointmentId}`
      );
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  const [doctor, setDoctor] = useState<any>();
  useEffect(() => {
    if (getCookie("doctorProfile")) {
      const doctorProfile = JSON.parse(
        getCookie("doctorProfile") as string
      );

      setDoctor(doctorProfile);
    }
  }, []);
  console.log(doctor);

  const searchForm = (
    <div className={styles.searchForm}>
      <Form form={form} layout="inline">
        <Form.Item name="searchText">
          <Input.Search
            allowClear
            placeholder="Tìm kiếm"
            onSearch={submit}
          />
        </Form.Item>
      </Form>
    </div>
  );
  const renderStatus = (status: string) => {
    switch (status) {
      case "REQUESTING":
        return <Tag color="gray">Đang chờ khám</Tag>;
      case "DONE":
        return <Tag color="green">Đã khám</Tag>;
      case "CHECKING":
        return <Tag color="purple">Đang khám</Tag>;
    }
  };
  const columns: ColumnsType<any> = [
    {
      title: "Thời gian đặt khám",
      dataIndex: "time",
      render: (value) => (
        <>{dayjs(value).format("DD/MM/YYYY HH:mm")}</>
      ),
    },
    {
      title: "Tên bệnh nhân",
      dataIndex: ["patient_information", "full_name"],
    },
    {
      title: "Triệu chứng",
      dataIndex: "medical_condition",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (value) => <>{renderStatus(value)}</>,
    },
    {
      title: "Hành động",
      width: "10%",
      align: "center",
      dataIndex: "",
      render: (value, record) => (
        <>
          <Button
            onClick={() => {
              if (record.status === "REQUESTING") {
                setAppointmentId(record.id);
                assign.run(record.id);
              } else {
                router.push(
                  `/doctor/specialist/appointment/${record.id}`
                );
              }
            }}
            disabled={
              record.status !== "REQUESTING" &&
              record.doctor_id !== doctor?.id
            }
          >
            {record.status === "REQUESTING"
              ? "Nhận khám"
              : "Xem chi tiết"}
          </Button>
        </>
      ),
    },
  ];
  return (
    <div className={styles.wrapper}>
      <Typography>
        <Typography.Title level={5}>
          Quản lý lịch khám
        </Typography.Title>
      </Typography>
      {searchForm}
      <div className={styles.tableContainer}>
        <Table
          {...tableProps}
          columns={columns}
          rowKey={(item) => item.id}
          scroll={{ x: 1000 }}
        />
      </div>
    </div>
  );
};

export default AppointmentSpecialist;
