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

export const uploadDepartmentService = (
  input: any,
  id: number
) => {
  return privateRequestHospital(
    "PUT",
    API_PATH.DEPARTMENT_DETAIL(id),
    { ...input }
  );
};

export const historyDepartmentService = (
  {
    current,
    pageSize,
    id,
  }: {
    current: number;
    pageSize: number;
    id: number;
  },
  formData?: {
    searchText: string;
  }
) => {
  console.log(id);

  const params = {
    department_id: Number(id),
    pageSize: pageSize,
    pageIndex: current,
    search_value: formData?.searchText ?? "",
  };
  return privateRequestHospital(
    "GET",
    API_PATH.APPOINTMENT,
    params
  ).then((response) => {
    return {
      list: response.data.data,
      total: response.data.total,
      department: response.data?.department,
    };
  });
};
