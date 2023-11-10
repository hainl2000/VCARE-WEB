import React, { useEffect, useState } from "react";
import { DetailFormProps } from "@/type/common.interface";
import { useAntdTable } from "ahooks";
import { Button, Form, Input, Modal, Table } from "antd";
import { getListMedicalServices } from "./service";
import styles from "./index.module.scss";
import { PlusOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import CreateMedicalService from "./CreateMedicalService";
import { formatNumber } from "@/utils/helper";
const DetailServiceForm = ({
  open,
  setOpen,
  refresh,
  id,
  title,
}: DetailFormProps) => {
  console.log(id);
  const onCancel = () => {
    setOpen(false);
  };
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const {
    tableProps,
    search,
    refresh: refreshListMedical,
  } = useAntdTable(getListMedicalServices, {
    form,
    defaultParams: [
      {
        current: 1,
        pageSize: 10,
        service_id: id,
      },
      {
        search: "",
      },
    ],
  });
  const { submit } = search;
  const searchForm = (
    <div className={styles.searchForm}>
      <Form form={form} layout="inline">
        <Form.Item name="search">
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
  const columns: ColumnsType<any> = [
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
    },
    {
      title: "Giá dịch vụ",
      dataIndex: "fee",
      render: (value) => <>{formatNumber(value)}Đ</>,
    },
    {
      title: "Phòng",
      dataIndex: "room",
    },
  ];

  return (
    <Modal
      width={800}
      open={open}
      onCancel={onCancel}
      title={title}
      footer={null}
    >
      <div className={styles.wrapper}>
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
      <CreateMedicalService
        open={isOpen}
        setOpen={setIsOpen}
        refresh={refreshListMedical}
        id={id}
      />
    </Modal>
  );
};

export default DetailServiceForm;
