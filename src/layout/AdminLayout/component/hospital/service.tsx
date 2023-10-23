import { privateRequestAdmin } from "@/api/request";
import { API_PATH } from "@/utils/constant";

export const getListHospital = (
  {
    current,
    pageSize,
  }: { current: number; pageSize: number },
  formData: {
    searchText: string;
  }
) => {
  const queryString = `?pageIndex=${current}&pageSize=${pageSize}&searchText=${
    formData.searchText ?? ""
  }`;
  return privateRequestAdmin(
    "GET",
    API_PATH.HOSPITAL + queryString
  ).then((res) => {
    return {
      list: res.data.data,
      total: res.data.total,
    };
  });
};

export const createHospitalService = (input: any) => {
  return privateRequestAdmin("GET", API_PATH.HOSPITAL, {
    ...input,
  });
};

export const detailHospitalService = (id: number) => {
  return privateRequestAdmin(
    "GET",
    API_PATH.DETAIL_HOSPITAL(id)
  );
};
