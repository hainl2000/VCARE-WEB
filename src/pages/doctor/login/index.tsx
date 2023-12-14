import { Skeleton } from "antd";
import dynamic from "next/dynamic";
import React from "react";

const DoctorLogin = dynamic(
  () => import("@/layout/DoctorLayout/login"),
  {
    ssr: false,
    loading: () => <Skeleton />,
  }
);

const DoctorLoginPage = () => {
  return <DoctorLogin />;
};

export async function getStaticProps() {
  return {
    props: {
      // Will be passed to the page component as props
    },
  };
}

export default DoctorLoginPage;
