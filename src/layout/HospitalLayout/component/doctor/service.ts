import { privateRequestHospital } from "@/api/request";
import { API_PATH } from "@/utils/constant";

export const createDoctorService = (input: any) => {
  return privateRequestHospital(
    "POST",
    API_PATH.DOCTOR_MANAGE,
    input
  );
};

export const getListDoctorRoles = () => {
  return privateRequestHospital(
    "GET",
    API_PATH.DOCTOR_ROLE
  );
};
