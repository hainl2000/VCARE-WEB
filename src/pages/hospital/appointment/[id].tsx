import DetailAppointment from "@/layout/HospitalLayout/component/department/DetailAppointment";
import dynamic from "next/dynamic";
import React from "react";

const HospitalLayout = dynamic(
  () => import("@/layout/HospitalLayout/HospitalLayout")
);

const HospitalDetailAppointment = () => {
  return (
    <HospitalLayout>
      <DetailAppointment />
    </HospitalLayout>
  );
};

export default HospitalDetailAppointment;
