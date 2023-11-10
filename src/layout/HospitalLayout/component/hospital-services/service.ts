import { privateRequestHospital } from "@/api/request";
import { API_PATH } from "@/utils/constant";

export const getServiceInHospital = (
  {
    current,
    pageSize,
  }: { current: number; pageSize: number },
  formData: {
    name: string;
  }
) => {
  const params = {
    pageSize: pageSize,
    pageIndex: current,
    name: formData.name ?? "",
  };
  return privateRequestHospital(
    "GET",
    API_PATH.HOSPITAL_SERVICES,
    params
  ).then((res) => {
    return {
      list: res.data.data,
      total: res.data.total,
    };
  });
};

export const createServiceHospital = (input: any) => {
  return privateRequestHospital(
    "POST",
    API_PATH.HOSPITAL_SERVICES,
    {
      ...input,
    }
  );
};

export const getListMedicalServices = (
  {
    current,
    pageSize,
    service_id,
  }: {
    current: number;
    pageSize: number;
    service_id: number;
  },
  formData?: {
    search?: string;
  }
) => {
  const params: any = {
    pageSize,
    serviceId: +service_id,
    pageIndex: current,
  };
  if (!!formData?.search) {
    params.name = formData.search;
  }
  return privateRequestHospital(
    "GET",
    API_PATH.HOSPITAL_MEDICAL_SERVICES,
    params
  ).then((res) => {
    return {
      list: res.data.data,
      total: res.data.total,
    };
  });
};

export const createMedicalService = (input: any) => {
  return privateRequestHospital(
    "POST",
    API_PATH.MEDICAL_SERVICES,
    input
  );
};
