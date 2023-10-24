export const API_PATH = {
  //admin
  ADMIN_LOGIN: "/auth/admin",
  ADMIN_INFO: "/admin/info",
  HOSPITAL: "/hospital",
  DETAIL_HOSPITAL: (id: number) => `/hospital/detail/${id}`,
  //hospital
  HOSPITAL_LOGIN: "/auth/hospital",
};
