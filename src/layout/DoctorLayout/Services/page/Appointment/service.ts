import { privateRequestDoctor } from "@/api/request";
import { API_PATH } from "@/utils/constant";
import moment from "moment";

export const getAppointmentService = (
  {
    current,
    pageSize,
  }: { current: number; pageSize: number },
  form: {
    search?: string;
  }
) => {
  const params = {
    search_value: !!form.search ? form.search : "",
    startFrom: moment(new Date()).format("YYYY-MM-DD"),
    endAt: moment(new Date()).format("YYYY-MM-DD"),
  };
  return privateRequestDoctor(
    "GET",
    API_PATH.SEARCH_APPOINTMENT,
    {
      ...params,
    }
  ).then((res) => {
    return {
      list: res.data,
      total: res.data?.length,
    };
  });
};

export const updateAppointmentService = (input: {
  service_id: number;
  appointment_id: number;
  result_image: string[];
}) => {
  return privateRequestDoctor(
    "POST",
    API_PATH.UPDATE_SERVICE_APPOINTMENT,
    input
  );
};
