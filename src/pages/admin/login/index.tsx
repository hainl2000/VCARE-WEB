import dynamic from "next/dynamic";
import React from "react";
const AdminLogin = dynamic(
  () => import("@/layout/AdminLayout/component/login"),
  {
    ssr: false,
  }
);
const AdminLoginPage = () => {
  return <AdminLogin />;
};

export default AdminLoginPage;
