import { Skeleton } from "antd";
import dynamic from "next/dynamic";
import React from "react";

const ServiceDoctorLayout = dynamic(
  () => import("@/layout/DoctorLayout/Services"),
  {
    ssr: false,
    loading: () => <Skeleton />,
  }
);

const DoctorServiceAppointment = dynamic(
  () =>
    import(
      "@/layout/DoctorLayout/Services/page/Appointment"
    ),
  {
    ssr: false,
    loading: () => <Skeleton />,
  }
);

const DoctorServiceAppointmentPage = () => {
  return (
    <ServiceDoctorLayout>
      <DoctorServiceAppointment />
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
