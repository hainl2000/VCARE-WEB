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

const HospitalPage = () => {
  return <HospitalLayout>HospitalPage</HospitalLayout>;
};

export default HospitalPage;
