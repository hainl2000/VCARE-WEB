import { Skeleton } from "antd";
import dynamic from "next/dynamic";
import React from "react";
const HospitalLayout = dynamic(
  () => import("@/layout/HospitalLayout/HospitalLayout"),
  {
    ssr: true,
    loading: () => <Skeleton />,
  }
);

const DoctorManagement = dynamic(
  () => import("@/layout/HospitalLayout/component/doctor"),
  {
    ssr: true,
    loading: () => <Skeleton />,
  }
);

const DoctorManagementPage = () => {
  return (
    <HospitalLayout>
      <DoctorManagement />
    </HospitalLayout>
  );
};
export async function getStaticProps() {
  return {
    props: {
      // Will be passed to the page component as props
    },
  };
}

export default DoctorManagementPage;
