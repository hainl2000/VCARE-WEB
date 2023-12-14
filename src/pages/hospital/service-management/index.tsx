import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "antd";

const HospitalLayout = dynamic(
  () => import("@/layout/HospitalLayout/HospitalLayout"),
  {
    ssr: true,
    loading: () => <Skeleton />,
  }
);

const HospitalService = dynamic(
  () =>
    import(
      "@/layout/HospitalLayout/component/hospital-services"
    ),
  {
    ssr: true,
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
