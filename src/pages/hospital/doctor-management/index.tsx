import DoctorManagement from "@/layout/HospitalLayout/component/doctor";
import { Skeleton } from "antd";
import dynamic from "next/dynamic";
import React from "react";
const HospitalLayout = dynamic(
  () => import("@/layout/HospitalLayout/HospitalLayout"),
  {
    ssr: false,
    loading: () => <Skeleton />,
  }
);

const DoctorManagementPage = () => {
  return (
    <HospitalLayout>
      <DoctorManagement />
    </HospitalLayout>
  );
};

export default DoctorManagementPage;
