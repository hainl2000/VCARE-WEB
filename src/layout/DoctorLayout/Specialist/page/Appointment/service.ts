import { privateRequestDoctor } from "@/api/request";
import { API_PATH } from "@/utils/constant";

export const getAppointmentService = (
  {
    current,
    pageSize,
  }: {
    current: number;
    pageSize: number;
  },
  formData: {
    searchText: string;
  }
) => {
  const params = {
    pageSize: pageSize,
    pageIndex: current,
    search_value: formData.searchText ?? "",
  };
  return privateRequestDoctor(
    "GET",
    API_PATH.APPOINTMENT,
    params
  ).then((response) => {
    return {
      list: response.data.data,
      total: response.data.total,
    };
  });
};

export const getDetailAppointment = (id: number) => {
  return privateRequestDoctor(
    "GET",
    API_PATH.DETAIL_APPOINTMENT(id)
  );
};

export const getAllMedicalServices = (search?: string) => {
  const params: { name?: string } = {};
  if (!!search) {
    params.name = search;
  }
  return privateRequestDoctor(
    "GET",
    API_PATH.HOSPITAL_MEDICAL_SERVICES,
    params
  );
};

export const updateAppointmentService = (
  id: number,
  input: any
) => {
  return privateRequestDoctor(
    "PUT",
    API_PATH.UPDATE_APPOINTMENT(id),
    input
  );
};

export const assignAppointment = (id: number) => {
  return privateRequestDoctor(
    "GET",
    API_PATH.ASSIGN_APOINTMENT(id)
  );
};
