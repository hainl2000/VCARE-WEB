import { request } from "@/api/request";
import { API_PATH } from "@/utils/constant";

export const loginDoctorService = (data: {
  username: string;
  password: string;
}) => {
  return request.post(API_PATH.DOCTOR_LOGIN, data);
};
