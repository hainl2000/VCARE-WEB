import { Skeleton } from "antd";
import dynamic from "next/dynamic";
import React from "react";

const LoginHospital = dynamic(
  () => import("@/layout/HospitalLayout/component/login"),
  {
    ssr: false,
    loading: () => <Skeleton />,
  }
);

const HospitalPage = () => {
  return <LoginHospital></LoginHospital>;
};

export default HospitalPage;
