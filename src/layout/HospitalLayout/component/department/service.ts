import { privateRequestHospital } from "@/api/request";
import { API_PATH } from "@/utils/constant";
import moment from "moment";

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
    toDate: string[];
  }
) => {
  console.log(id);

  const params: any = {
    department_id: Number(id),
    pageSize: pageSize,
    pageIndex: current,
    search_value: formData?.searchText ?? "",
  };
  const fromDate = Array.isArray(formData?.toDate)
    ? moment(formData?.toDate[0]).format("YYYY-MM-DD")
    : "";
  const toDate = Array.isArray(formData?.toDate)
    ? moment(formData?.toDate[1]).format("YYYY-MM-DD")
    : "";
  if (!!fromDate && !!toDate) {
    params.startFrom = fromDate;
    params.endAt = toDate;
  }
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

export const getDetailAppointment = (id: number) => {
  return privateRequestHospital(
    "GET",
    API_PATH.DETAIL_APPOINTMENT(id)
  );
};
