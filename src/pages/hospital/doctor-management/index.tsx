import DoctorManagement from "@/layout/HospitalLayout/component/doctor";
import dynamic from "next/dynamic";
import React from "react";
const HospitalLayout = dynamic(
  () => import("@/layout/HospitalLayout/HospitalLayout")
);

const DoctorManagementPage = () => {
  return (
    <HospitalLayout>
      <DoctorManagement />
    </HospitalLayout>
  );
};

export default DoctorManagementPage;
