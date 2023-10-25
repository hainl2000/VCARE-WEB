import HospitalLayout from "@/layout/HospitalLayout/HospitalLayout";
import HospitalDepartment from "@/layout/HospitalLayout/component/department";
import React from "react";

const DepartmentManagePage = () => {
  return (
    <HospitalLayout>
      <HospitalDepartment />
    </HospitalLayout>
  );
};

export default DepartmentManagePage;
