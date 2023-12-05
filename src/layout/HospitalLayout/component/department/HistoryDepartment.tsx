import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import {
  Button,
  Form,
  Input,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useAntdTable } from "ahooks";
import { historyDepartmentService } from "./service";
import { LeftOutlined } from "@ant-design/icons";
const HistoryDepartment = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;
  const [idDepartment, setIdDepartment] = useState(0);
  useEffect(() => {
    if (id) {
      run({
        current: 1,
        pageSize: 10,
        id: Number(id),
      });
    }
  }, [id]);
  console.log(idDepartment);

  const { tableProps, search, run, data } = useAntdTable(
    historyDepartmentService,
    {
      manual: true,
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
            type={
              record.status === "REQUESTING"
                ? "primary"
                : "ghost"
            }
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
      </Form>
    </div>
  );
  return (
    <div className={styles.wrapper}>
      <div
        onClick={() =>
          router.push("/hospital/department-management")
        }
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
      >
        <LeftOutlined
          style={{
            marginRight: "15px",
            paddingBottom: "5px",
          }}
        />
        <Typography>
          <Typography.Title level={5}>
            Lịch sử đặt khám {data?.department}
          </Typography.Title>
        </Typography>
      </div>
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

export default HistoryDepartment;
