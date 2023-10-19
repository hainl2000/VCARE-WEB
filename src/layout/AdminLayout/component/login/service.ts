import { request } from "@/api/request";
import { API_PATH } from "@/utils/constant";

interface LoginAdminInput {
  username: string;
  password: string;
}
export const loginAdmin = (data: LoginAdminInput) => {
  return request.post(API_PATH.ADMIN_LOGIN, data);
};
