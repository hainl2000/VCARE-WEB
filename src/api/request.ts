import axios from "axios";
import { getCookie } from "cookies-next";
const instanceRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
  headers: {
    web: "true",
  },
});

export const request = instanceRequest;
// instanceRequest.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   (err) => {
//     console.log(err, "interceptors");
//   }
// );
export const privateRequestHospital = async (
  method: string,
  url: string,
  payload?: any
) => {
  const tokenHospital = await getCookie(
    "accessTokenHospital"
  );
  return instanceRequest({
    withCredentials: false,
    method: method,
    url: url,
    data: payload,
    params: method === "GET" ? payload : null,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenHospital}`,
    },
  });
};

export const privateRequestDoctor = async (
  method: string,
  url: string,
  payload?: any
) => {
  const tokenDoctor = await getCookie("accessTokenDoctor");
  return instanceRequest({
    method: method,
    url: url,
    data: payload,
    params: method === "GET" ? payload : null,
    headers: {
      Authorization: `Bearer ${tokenDoctor}`,
    },
  });
};

export const privateRequestAdmin = async (
  method: string,
  url: string,
  payload?: any
) => {
  const tokenAdmin = await getCookie("accessTokenAdmin");
  return instanceRequest({
    method: method,
    url: url,
    data: payload,
    params: method === "GET" ? payload : null,
    headers: {
      Authorization: `Bearer ${tokenAdmin}`,
    },
  });
};
