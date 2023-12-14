import dynamic from "next/dynamic";
import React from "react";

const LoginHospital = dynamic(
  () => import("@/layout/HospitalLayout/component/login")
);

const HospitalPage = () => {
  return <LoginHospital></LoginHospital>;
};

export default HospitalPage;
