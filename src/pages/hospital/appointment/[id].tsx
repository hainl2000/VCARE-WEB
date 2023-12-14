import DetailAppointment from "@/layout/HospitalLayout/component/department/DetailAppointment";
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

const HospitalDetailAppointment = () => {
  return (
    <HospitalLayout>
      <DetailAppointment />
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
export default HospitalDetailAppointment;
