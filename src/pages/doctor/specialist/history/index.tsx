import { Skeleton } from "antd";
import dynamic from "next/dynamic";
import React from "react";

const SpecialistDoctorLayout = dynamic(
  () =>
    import(
      "@/layout/DoctorLayout/Specialist/SpecialistDoctorLayout"
    ),
  {
    loading: () => <Skeleton />,
  }
);

const HistoryDoctorSpecialist = dynamic(
  () =>
    import("@/layout/DoctorLayout/Specialist/page/History"),
  {
    loading: () => <Skeleton />,
  }
);

const AppointmentSpecialistPage = () => {
  return (
    <SpecialistDoctorLayout>
      <HistoryDoctorSpecialist />
    </SpecialistDoctorLayout>
  );
};
export async function getStaticProps() {
  return {
    props: {
      // Will be passed to the page component as props
    },
  };
}

export default AppointmentSpecialistPage;
