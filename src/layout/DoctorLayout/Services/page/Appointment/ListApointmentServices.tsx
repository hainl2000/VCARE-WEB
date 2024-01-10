import { useAntdTable } from "ahooks";
import React, { useState } from "react";
import { getAppointmentService } from "./service";
import { Button, Form, Input, Table } from "antd";
import styles from "./index.module.scss";
import { ColumnsType } from "antd/lib/table";
import dayjs from "dayjs";
import DoctorServiceAppointment from ".";
const ListApointmentServices = () => {
  const [form] = Form.useForm();
  const [selected, setSelected] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const { tableProps, search, refresh } = useAntdTable(
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
      render: (value, rc) => (
        <>
          {rc?.services_result?.every(
            (item: any) => !!item?.url
          )
            ? "Đã khám"
            : "Chưa khám"}
        </>
      ),
    },
    {
      title: "Hành động",
      width: "10%",
      align: "center",
      dataIndex: "",
      render: (value, rc) => (
        <>
          <Button
            type="primary"
            ghost
            onClick={() => {
              setIsOpen(true);
              setSelected(rc);
            }}
            disabled={
              rc?.services_result?.every(
                (item: any) => !!item?.url
              )
                ? true
                : false
            }
          >
            Xem
          </Button>
        </>
      ),
    },
  ];
  return (
    <div>
      {searchForm}
      <Table columns={columns} {...tableProps} />
      {isOpen && (
        <DoctorServiceAppointment
          refresh={refresh}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          appointment={selected}
        />
      )}
    </div>
  );
};

export default ListApointmentServices;
