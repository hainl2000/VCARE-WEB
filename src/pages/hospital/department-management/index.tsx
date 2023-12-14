import HospitalDepartment from "@/layout/HospitalLayout/component/department";
import { Skeleton } from "antd";
import dynamic from "next/dynamic";
import React from "react";

const HospitalLayout = dynamic(
  () => import("@/layout/HospitalLayout/HospitalLayout"),
  {
    loading: () => <Skeleton />,
  }
);

const DepartmentManagePage = () => {
  return (
    <HospitalLayout>
      <HospitalDepartment />
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
export default DepartmentManagePage;
