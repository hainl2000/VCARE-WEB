import { privateRequestDoctor } from "@/api/request";
import { API_PATH } from "@/utils/constant";
import moment from "moment";

export const getAllHistory = (
  {
    current,
    pageSize,
  }: { current: number; pageSize: number },
  formData: {
    toDate: string[];
    searchText: string;
  }
) => {
  const params: any = {
    pageSize: pageSize,
    pageIndex: current,
    search_value: formData.searchText ?? "",
  };
  if (!!formData.searchText) {
    params.search_value = formData.searchText;
  }
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
  return privateRequestDoctor(
    "GET",
    API_PATH.HISTORY_SPECIALIST,
    params
  ).then((response) => {
    return {
      list: response.data.data,
      total: response.data.total,
    };
  });
};
