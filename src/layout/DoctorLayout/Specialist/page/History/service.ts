import { privateRequestDoctor } from "@/api/request";
import { API_PATH } from "@/utils/constant";

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
  const params = {
    pageSize: pageSize,
    pageIndex: current,
    search_value: formData.searchText ?? "",
  };
  if (!!formData.searchText) {
    params.search_value = formData.searchText;
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
