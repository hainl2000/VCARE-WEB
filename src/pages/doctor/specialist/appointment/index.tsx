// import SpecialistDoctorLayout from "@/layout/DoctorLayout/Specialist/SpecialistDoctorLayout";
// import AppointmentSpecialist from "@/layout/DoctorLayout/Specialist/page/Appointment";
// import React from "react";

// const AppointmentSpecialistPage = () => {
//   return (
//     <SpecialistDoctorLayout>
//       <AppointmentSpecialist />
//     </SpecialistDoctorLayout>
//   );
// };

// export default AppointmentSpecialistPage;

import { Skeleton } from "antd";
import dynamic from "next/dynamic";
import React from "react";
const SpecialistDoctorLayout = dynamic(
  () =>
    import(
      "@/layout/DoctorLayout/Specialist/SpecialistDoctorLayout"
    ),
  {
    ssr: true,
    loading: () => <Skeleton />,
  }
);
const AppointmentSpecialist = dynamic(
  () =>
    import(
      "@/layout/DoctorLayout/Specialist/page/Appointment"
    ),
  {
    ssr: true,
    loading: () => <Skeleton />,
  }
);
const AppointmentSpecialistPage = () => {
  return (
    <SpecialistDoctorLayout>
      <AppointmentSpecialist />
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
