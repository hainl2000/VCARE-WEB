import React from "react";
import HospitalManagement from "@/layout/AdminLayout/component/hospital";
import dynamic from "next/dynamic";

const AdminLayout = dynamic(
  () => import("@/layout/AdminLayout/AdminLayout")
);

const HospitalManagePage = () => {
  return (
    <AdminLayout>
      <HospitalManagement />
    </AdminLayout>
  );
};

export default HospitalManagePage;
