import React from "react";
import HospitalService from "@/layout/HospitalLayout/component/hospital-services";
import dynamic from "next/dynamic";

const HospitalLayout = dynamic(
  () => import("@/layout/HospitalLayout/HospitalLayout")
);

const HospitalServicePage = () => {
  return (
    <HospitalLayout>
      <HospitalService />
    </HospitalLayout>
  );
};

export default HospitalServicePage;
