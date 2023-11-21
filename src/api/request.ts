import axios from "axios";
import { error } from "console";
import { deleteCookie, getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
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
  const decode = jwtDecode(tokenHospital as string);
  const currentTime = Date.now() / 1000;
  if (!!decode?.exp && decode.exp < currentTime) {
    deleteCookie("accessTokenHospital");
  }
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
  const decode = jwtDecode(tokenDoctor as string);
  const currentTime = Date.now() / 1000;
  if (!!decode?.exp && decode.exp < currentTime) {
    deleteCookie("accessTokenDoctor");
  }
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
  const decode = jwtDecode(tokenAdmin as string);
  const currentTime = Date.now() / 1000;
  if (!!decode?.exp && decode.exp < currentTime) {
    deleteCookie("accessTokenAdmin");
  }
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
