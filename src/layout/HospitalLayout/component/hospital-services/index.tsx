import React, { useState } from "react";
import styles from "./index.module.scss";
import {
  Button,
  Form,
  Input,
  Table,
  Tooltip,
  Typography,
  message,
} from "antd";
import {
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { useAntdTable } from "ahooks";
import CreateServiceForm from "./CreateServiceForm";
import DetailServiceForm from "./DetailServiceForm";
import { getServiceInHospital } from "./service";
import { formatNumber } from "@/utils/helper";
const HospitalService = () => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [id, setId] = useState();
  const { tableProps, search, refresh } = useAntdTable(
    getServiceInHospital,
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
      title: "Tên dịch vụ",
      dataIndex: "name",
    },
    {
      title: "Giá dịch vụ",
      dataIndex: "fee",
      render(value) {
        return <>{formatNumber(value)}</>;
      },
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
        Thêm dịch vụ
      </Button>
    </div>
  );
  return (
    <div className={styles.wrapper}>
      <Typography>
        <Typography.Title level={5}>
          Quản lý dịch vụ khám
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
        <CreateServiceForm
          open={isOpen}
          setOpen={setIsOpen}
          refresh={refresh}
        />
      )}
      {isOpenDetail && (
        <DetailServiceForm
          open={isOpenDetail}
          setOpen={setIsOpenDetail}
          refresh={refresh}
          id={Number(id)}
        />
      )}
    </div>
  );
};

export default HospitalService;
