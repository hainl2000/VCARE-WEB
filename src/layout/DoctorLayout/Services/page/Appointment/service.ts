import { privateRequestDoctor } from "@/api/request";
import { API_PATH } from "@/utils/constant";

export const getAppointmentService = (search?: string) => {
  return privateRequestDoctor(
    "GET",
    API_PATH.SEARCH_APPOINTMENT,
    {
      search_value: !!search ? search : "",
    }
  );
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
