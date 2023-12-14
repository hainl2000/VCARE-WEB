import HistoryDepartment from "@/layout/HospitalLayout/component/department/HistoryDepartment";
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
const DepartmentHistoryPage = () => {
  return (
    <HospitalLayout>
      <HistoryDepartment />
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
export default DepartmentHistoryPage;
