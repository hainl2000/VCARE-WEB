import { request } from "@/api/request";
import { API_PATH } from "@/utils/constant";

interface LoginHospitalInput {
  username: string;
  password: string;
}
export const loginHospital = (data: LoginHospitalInput) => {
  return request.post(API_PATH.HOSPITAL_LOGIN, data);
};
