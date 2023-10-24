import React from "react";
import AdminLayout from "@/layout/AdminLayout/AdminLayout";
import HospitalManagement from "@/layout/AdminLayout/component/hospital";

const HospitalManagePage = () => {
  return (
    <AdminLayout>
      <HospitalManagement />
    </AdminLayout>
  );
};

export default HospitalManagePage;
