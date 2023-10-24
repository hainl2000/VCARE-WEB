import { useAntdTable } from "ahooks";
import React, { useState } from "react";
import { getListHospital } from "./service";
import {
  Button,
  Form,
  Input,
  Tooltip,
  Typography,
  message,
} from "antd";
import styles from "./index.module.scss";
import Table, { ColumnsType } from "antd/lib/table";
import dayjs from "dayjs";
import {
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import CreateHospitalForm from "./CreateHospitalForm";
import DetailHospitalForm from "./DetailHospitalForm";
const HospitalManagement = () => {
  const [form] = Form.useForm();
  const { tableProps, search, refresh } = useAntdTable(
    getListHospital,
    {
      form,
      onError(err) {
        message.error("Có lỗi xảy ra");
      },
    }
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [id, setId] = useState();
  const columns: ColumnsType<any> = [
    {
      title: "Tên bệnh viện",
      dataIndex: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      render: (value) => (
        <>{dayjs(value).format("DD/MM/YYYY")}</>
      ),
    },
    {
      title: "Hành động",
      // dataIndex: "",
      align: "center",
      width: "10%",
      render: (value, record) => (
        <>
          <Tooltip title="Xem chi tiết">
            <EyeOutlined
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setIsOpenDetail(true);
                setId(record.id);
              }}
            />
          </Tooltip>
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
      <Button
        type="primary"
        onClick={() => setIsOpen(true)}
        icon={<PlusOutlined />}
      >
        Tạo bệnh viện
      </Button>
    </div>
  );
  return (
    <div className={styles.wrapper}>
      <Typography>
        <Typography.Title level={5}>
          Quản lý bệnh viện
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
        <CreateHospitalForm
          open={isOpen}
          setOpen={setIsOpen}
          refresh={refresh}
        />
      )}
      {isOpenDetail && (
        <DetailHospitalForm
          open={isOpenDetail}
          setOpen={setIsOpenDetail}
          refresh={refresh}
          id={Number(id)}
        />
      )}
    </div>
  );
};

export default HospitalManagement;
