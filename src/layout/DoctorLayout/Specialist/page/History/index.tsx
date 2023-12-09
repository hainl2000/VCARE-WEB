import React from "react";
import styles from "./index.module.scss";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Tag,
  Typography,
} from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useAntdTable } from "ahooks";
import { getAllHistory } from "./service";
const HistoryDoctorSpecialist = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { tableProps, search } = useAntdTable(
    getAllHistory,
    {
      form,
    }
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
      dataIndex: "time_in_string",
      render: (value) => (
        <>{dayjs(value).format("DD/MM/YYYY")}</>
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
            type="primary"
            ghost
            onClick={() => {
              router.push(
                `/doctor/specialist/appointment/${record.id}`
              );
            }}
          >
            Xem chi tiết
          </Button>
        </>
      ),
    },
  ];
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
        <Form.Item
          name="toDate"
          className={styles.searchItem}
        >
          <DatePicker.RangePicker
            format="DD/MM/YYYY"
            onChange={submit}
            className="w-100"
            picker="date"
            placeholder={["Từ ngày", "Đến ngày"]}
          />
        </Form.Item>
      </Form>
    </div>
  );
  return (
    <div className={styles.wrapper}>
      <Typography>
        <Typography.Title level={5}>
          Lịch khám
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

export default HistoryDoctorSpecialist;
