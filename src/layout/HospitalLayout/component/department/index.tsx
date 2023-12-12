import React, { useState } from "react";
import styles from "./index.module.scss";
import {
  Button,
  Form,
  Input,
  Row,
  Table,
  Typography,
  message,
} from "antd";
import {
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import CreateDepartmentForm from "./CreateDepartmentForm";
import DetailDepartmentForm from "./DetailDepartmentForm";
import { ColumnsType } from "antd/lib/table";
import { useAntdTable } from "ahooks";
import { getListDepartment } from "./service";
import { useRouter } from "next/router";
const HospitalDepartment = () => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [info, setInfo] = useState<any>();
  const router = useRouter();
  const { tableProps, search, refresh } = useAntdTable(
    getListDepartment,
    {
      form,
      onError: (err: any) => {
        message.error(err);
      },
    }
  );
  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Tên phòng khám",
      dataIndex: "name",
    },
    {
      title: "Thời gian khám trung bình (phút)",
      dataIndex: "time_per_turn",
    },
    {
      title: "Mã số phòng",
      dataIndex: "room",
      // render(value) {
      //   return <>{value?.length}</>;
      // },
    },
    {
      title: "Số đơn đặt khám hôm nay",
      dataIndex: "start_order",
      render: (value) => <>{value - 1}</>,
    },
    {
      title: "Hành động",
      // width: "15%",
      align: "center",
      render: (value: any, record: any) => (
        <Row justify="space-around">
          <Button
            onClick={() => {
              router.push(
                `/hospital/department-management/${record.id}`
              );
            }}
          >
            Xem đơn khám
          </Button>
          <Button
            title="Chỉnh sửa"
            icon={<EditOutlined />}
            type="primary"
            onClick={() => {
              setIsOpenDetail(true);
              setInfo(record);
            }}
          ></Button>
        </Row>
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
      <Button
        type="primary"
        onClick={() => setIsOpen(true)}
        icon={<PlusOutlined />}
      >
        Thêm phòng khám
      </Button>
    </div>
  );
  return (
    <div className={styles.wrapper}>
      <Typography>
        <Typography.Title level={5}>
          Quản lý phòng khám
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

      {isOpen && (
        <CreateDepartmentForm
          open={isOpen}
          setOpen={setIsOpen}
          refresh={refresh}
        />
      )}
      {isOpenDetail && (
        <DetailDepartmentForm
          open={isOpenDetail}
          setOpen={setIsOpenDetail}
          refresh={refresh}
          //  id={Number(id)}
          info={info}
          id={info?.id}
        />
      )}
    </div>
  );
};

export default HospitalDepartment;
