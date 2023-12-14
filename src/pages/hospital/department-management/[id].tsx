import { Skeleton } from "antd";
import { GetStaticPaths } from "next";
import dynamic from "next/dynamic";
import React from "react";
const HospitalLayout = dynamic(
  () => import("@/layout/HospitalLayout/HospitalLayout"),
  {
    ssr: true,
    loading: () => <Skeleton />,
  }
);

const HistoryDepartment = dynamic(
  () =>
    import(
      "@/layout/HospitalLayout/component/department/HistoryDepartment"
    ),
  {
    ssr: true,
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
export const getStaticPaths: GetStaticPaths<{
  slug: string;
}> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};
export default DepartmentHistoryPage;
