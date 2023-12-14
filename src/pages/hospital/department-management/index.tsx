import HospitalDepartment from "@/layout/HospitalLayout/component/department";
import dynamic from "next/dynamic";
import React from "react";

const HospitalLayout = dynamic(
  () => import("@/layout/HospitalLayout/HospitalLayout")
);

const DepartmentManagePage = () => {
  return (
    <HospitalLayout>
      <HospitalDepartment />
    </HospitalLayout>
  );
};

export default DepartmentManagePage;
