import { privateRequestDoctor } from "@/api/request";
import { API_PATH } from "@/utils/constant";

export const getAppointmentService = (
  {
    current,
    pageSize,
  }: { current: number; pageSize: number },
  formData: {
    searchText: string;
  }
) => {
  return privateRequestDoctor(
    "GET",
    API_PATH.LIST_APPOINTMENT,
    {
      pageSize: pageSize,
      pageIndev: current,
      search_text: formData.searchText ?? "",
    }
  ).then((response) => {
    return {
      list: response.data.data,
      total: response.data.total,
    };
  });
};
