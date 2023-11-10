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
  HOSPITAL_MEDICAL_SERVICES: "/hospital-service/list",
  MEDICAL_SERVICES: "/hospital-service/medical-service",
  DOCTOR_MANAGE: "/doctor",
  DOCTOR_ROLE: "/doctor-role",
  //doctor
  DOCTOR_LOGIN: "/auth/doctor",
  APPOINTMENT: "/appointment",
  DETAIL_APPOINTMENT: (id: number) =>
    `/appointment/detail/${id}`,
  UPDATE_APPOINTMENT: (id: number) => `/appointment/${id}`,
  SEARCH_APPOINTMENT: "/appointment/search-appointment",
  UPDATE_SERVICE_APPOINTMENT: "/appointment/service",
};
