import React from "react";
import HospitalService from "@/layout/HospitalLayout/component/hospital-services";
import dynamic from "next/dynamic";
import { Skeleton } from "antd";

const HospitalLayout = dynamic(
  () => import("@/layout/HospitalLayout/HospitalLayout"),
  {
    ssr: false,
    loading: () => <Skeleton />,
  }
);

const HospitalServicePage = () => {
  return (
    <HospitalLayout>
      <HospitalService />
    </HospitalLayout>
  );
};

export default HospitalServicePage;
