import SpecialistDoctorLayout from "@/layout/DoctorLayout/Specialist/SpecialistDoctorLayout";
import HistoryDoctorSpecialist from "@/layout/DoctorLayout/Specialist/page/History";
import React from "react";

const AppointmentSpecialistPage = () => {
  return (
    <SpecialistDoctorLayout>
      <HistoryDoctorSpecialist />
    </SpecialistDoctorLayout>
  );
};

export default AppointmentSpecialistPage;
