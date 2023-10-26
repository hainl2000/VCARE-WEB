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
