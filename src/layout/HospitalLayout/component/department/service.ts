import { privateRequestHospital } from "@/api/request";
import { API_PATH } from "@/utils/constant";

export const getListDepartment = (
  {
    current,
    pageSize,
  }: { current: number; pageSize: number },
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
    API_PATH.DEPARTMENT_MANAGE,
    params
  ).then((response) => {
    return {
      list: response.data.data,
      total: response.data.total,
    };
  });
};

export const createDepartmentService = (input: any) => {
  return privateRequestHospital(
    "POST",
    API_PATH.DEPARTMENT_MANAGE,
    { ...input }
  );
};
