import axios from "axios";
import { getCookie } from "cookies-next";
const instanceRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
  // headers: {
  //   "Content-Type": "application/json; charset=utf",
  // },
});

export const request = instanceRequest;
export const privateRequest = async (
  method: string,
  url: string,
  payload?: any
) => {
  const tokenManager = await getCookie(
    "accessTokenManager"
  );
  return instanceRequest({
    withCredentials: false,
    method: method,
    url: url,
    data: payload,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${tokenManager}`,
    },
  });
};

export const privateRequestUser = async (
  method: string,
  url: string,
  payload?: any
) => {
  const tokenUser = await getCookie("accessTokenUser");
  return instanceRequest({
    method: method,
    url: url,
    data: payload,
    headers: {
      Authorization: `Bearer ${tokenUser}`,
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
    headers: {
      Authorization: `Bearer ${tokenAdmin}`,
    },
  });
};
