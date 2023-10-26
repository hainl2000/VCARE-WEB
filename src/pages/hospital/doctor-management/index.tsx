import HospitalLayout from "@/layout/HospitalLayout/HospitalLayout";
import DoctorManagement from "@/layout/HospitalLayout/component/doctor";
import React from "react";

const DoctorManagementPage = () => {
  return (
    <HospitalLayout>
      <DoctorManagement />
    </HospitalLayout>
  );
};

export default DoctorManagementPage;
