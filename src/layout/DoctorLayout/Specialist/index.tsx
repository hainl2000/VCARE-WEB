import { useAntdTable } from "ahooks";
import React from "react";
import { getAppointmentService } from "./service";
import { Form } from "antd";

const SpecialistDoctor = () => {
  const [form] = Form.useForm();
  const {} = useAntdTable(getAppointmentService, {
    form,
  });
  return <div></div>;
};

export default SpecialistDoctor;
