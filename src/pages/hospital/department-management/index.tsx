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

const HospitalDepartment = dynamic(
  () =>
    import("@/layout/HospitalLayout/component/department"),
  {
    ssr: true,
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
