import React from "react";
import {
  Button,
  Form,
  Input,
  Table,
  Tag,
  Typography,
} from "antd";
import styles from "./index.module.scss";
import { useAntdTable } from "ahooks";
import { getAppointmentService } from "./service";
import { ColumnsType } from "antd/lib/table";
import dayjs from "dayjs";
const AppointmentSpecialist = () => {
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(
    getAppointmentService,
    {
      form,
    }
  );
  const { submit } = search;
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
      dataIndex: "finished",
      render: (value) => (
        <>
          {value ? (
            <Tag color="green">Đã khám</Tag>
          ) : (
            <Tag color="gray">Chưa khám</Tag>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      width: "10%",
      align: "center",
      dataIndex: "",
      render: (value, record) => (
        <>
          <Button
            href={`/doctor/specialist/appointment/${record.id}`}
          >
            Xem chi tiết
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
