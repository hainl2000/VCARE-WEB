export const API_PATH = {
  //admin
  ADMIN_LOGIN: "/auth/admin",
  ADMIN_INFO: "/admin/info",
  HOSPITAL: "/hospital",
  DETAIL_HOSPITAL: (id: number) => `/hospital/detail/${id}`,
  //hospital
  HOSPITAL_LOGIN: "/auth/hospital",
  HOSPITAL_DOCTOR: "/hospital/doctors",
  DEPARTMENT_MANAGE: "/department",
  HOSPITAL_SERVICES: "/hospital-service",
  DOCTOR_MANAGE: "/doctor",
  DOCTOR_ROLE: "/doctor-role",
};
