import { request } from "@/api/request";
import { API_PATH } from "@/utils/constant";
import axios from "axios";

interface LoginAdminInput {
  username: string;
  password: string;
}
export const loginAdmin = (data: LoginAdminInput) => {
  return axios.post(
    "http://35.240.154.21/api/auth/admin",
    data
  );
};
