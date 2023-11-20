import { privateRequestHospital } from "@/api/request";
import { API_PATH } from "@/utils/constant";

export const getListDoctor = (
  {
    current,
    pageSize,
  }: { pageSize: number; current: number },
  formData: {
    searchText: string;
  }
) => {
  const params = {
    pageSize: pageSize,
    pageIndex: current,
    name: formData.searchText ?? "",
  };
  return privateRequestHospital(
    "GET",
    API_PATH.HOSPITAL_DOCTOR,
    params
  ).then((response) => {
    return {
      list: response.data.data,
      total: response.data.total,
    };
  });
};

export const createDoctorService = (input: any) => {
  return privateRequestHospital(
    "POST",
    API_PATH.DOCTOR_MANAGE,
    input
  );
};

export const getDetailDoctorService = (id: number) => {
  return privateRequestHospital(
    "GET",
    API_PATH.DOCTOR_MANAGE,
    { doctor_id: id }
  );
};

export const updateDoctorService = (input: any) => {
  return privateRequestHospital(
    "PUT",
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

export const getAllDepartments = () => {
  return privateRequestHospital(
    "GET",
    API_PATH.DEPARTMENT_MANAGE,
    {
      pageIndex: 1,
      pageSize: 50,
    }
  );
};

export const getAllHospitalServices = () => {
  return privateRequestHospital(
    "GET",
    API_PATH.HOSPITAL_SERVICES,
    {
      pageIndex: 1,
      pageSize: 50,
    }
  );
};
