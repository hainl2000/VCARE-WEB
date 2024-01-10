import ListApointmentServices from "@/layout/DoctorLayout/Services/page/Appointment/ListApointmentServices";
import { Skeleton } from "antd";
import dynamic from "next/dynamic";
import React from "react";

const ServiceDoctorLayout = dynamic(
  () => import("@/layout/DoctorLayout/Services"),
  {
    ssr: true,
    loading: () => <Skeleton />,
  }
);

const DoctorServiceAppointment = dynamic(
  () =>
    import(
      "@/layout/DoctorLayout/Services/page/Appointment"
    ),
  {
    ssr: true,
    loading: () => <Skeleton />,
  }
);

const DoctorServiceAppointmentPage = () => {
  return (
    <ServiceDoctorLayout>
      <ListApointmentServices />
    </ServiceDoctorLayout>
  );
};
export async function getStaticProps() {
  return {
    props: {
      // Will be passed to the page component as props
    },
  };
}
export default DoctorServiceAppointmentPage;
