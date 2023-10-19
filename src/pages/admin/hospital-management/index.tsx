import AdminLayout from "@/layout/AdminLayout/AdminLayout";
import HospitalManagement from "@/layout/AdminLayout/component/hospital";
import React from "react";

const HospitalManagePage = () => {
  return (
    <AdminLayout>
      <HospitalManagement />
    </AdminLayout>
  );
};

export default HospitalManagePage;
