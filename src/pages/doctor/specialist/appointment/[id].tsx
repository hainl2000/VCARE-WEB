import React from "react";
import { Skeleton } from "antd";
import dynamic from "next/dynamic";
import { GetStaticPaths } from "next";

const SpecialistDoctorLayout = dynamic(
  () =>
    import(
      "@/layout/DoctorLayout/Specialist/SpecialistDoctorLayout"
    ),
  {
    ssr: false,
    loading: () => <Skeleton />,
  }
);

const DetailAppointment = dynamic(
  () =>
    import(
      "@/layout/DoctorLayout/Specialist/page/Appointment/DetailAppointment"
    ),
  {
    loading: () => <Skeleton />,
  }
);

const DetailAppointmentPage = () => {
  return (
    <SpecialistDoctorLayout>
      <DetailAppointment />
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
export const getStaticPaths: GetStaticPaths<{
  slug: string;
}> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export default DetailAppointmentPage;
