import axios, { AxiosError, AxiosResponse } from "axios";
import { validateTokens } from "./auth";
import { getRecoil } from "recoil-nexus";
import { BASE_URL } from "../constants";
import { accessTokenAtom } from "../global/user-state";

/* Sends get request without authentication */
export const get = async <T>(url: string): Promise<AxiosResponse<T>> => {
  return await axios.request<T>({
    method: "get",
    url: `${BASE_URL}${url}`,
    withCredentials: true,
  });
};

/* Sends get post request without authentication */
export const post = async <T>(
  url: string,
  data: {}
): Promise<AxiosResponse<T>> => {
  return await axios.request<T>({
    method: "post",
    url: `${BASE_URL}${url}`,
    withCredentials: true,
    data: data,
  });
};

/* Send GET request with authentication. Ensure tokens that we have stored are
fresh and ready to go. */
export const authGet = async <T>(url: string): Promise<AxiosResponse<T>> => {
  const accessToken = getRecoil(accessTokenAtom);

  // Check expiry and refresh tokens if need be before sending this request
  await validateTokens();
  return await axios.request<T>({
    method: "get",
    headers: {
      "Access-Control-Allow-Origin": true,
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
    url: `${BASE_URL}${url}`,
  });
};

/* Send DELETE request with authentication. Ensure tokens that we have stored are
fresh and ready to go. */
export const authDelete = async <T>(
  url: string,
  data = {}
): Promise<AxiosResponse<T>> => {
  const accessToken = getRecoil(accessTokenAtom);

  // Check expiry and refresh tokens if nfeed be before sending this request
  await validateTokens();
  return await axios.request<T>({
    method: "delete",
    headers: {
      "Access-Control-Allow-Origin": true,
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
    url: `${BASE_URL}${url}`,
    data: data,
  });
};

/* Send POST request with authentication. Ensure tokens that we have stored are
fresh and ready to go. */
export const authPost = async <T>(
  url: string,
  data = {}
): Promise<AxiosResponse<T>> => {
  const accessToken = getRecoil(accessTokenAtom);

  // Check expiry and refresh tokens if need be before sending this request
  await validateTokens();
  return await axios.request<T>({
    method: "post",
    headers: {
      "Access-Control-Allow-Origin": true,
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
    url: `${BASE_URL}${url}`,
    data: data,
  });
};

/* Send PUT request with authentication. Ensure tokens that we have stored are
fresh and ready to go. */
export const authPut = async <T>(
  url: string,
  data = {}
): Promise<AxiosResponse<T>> => {
  const accessToken = getRecoil(accessTokenAtom);

  // Check expiry and refresh tokens if need be before sending this request
  await validateTokens();
  return await axios.request<T>({
    method: "put",
    headers: {
      "Access-Control-Allow-Origin": true,
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
    url: `${BASE_URL}${url}`,
    data: data,
  });
};

/* Check if the error is an AxiosError, and then print out message and error
data if it is. */
export const catchError = (msg: string, e: any) => {
  if (axios.isAxiosError(e)) {
    const err = e as AxiosError;
    console.error(msg, err.response?.data);
  } else {
    // This wasn't an axios error, this is not good.
    console.error(`An unexpected error ocurred when receiving API call: ${e}`);
  }
};

/* Take a dictionary of possible arguments and include them in the query string
if they are defined. */
export const generateQuery = (
  args: Record<string, string | number | boolean | undefined>
): string => {
  const params = new URLSearchParams();
  Object.entries(args).forEach(([key, value]) => {
    if (value != null) {
      params.append(key, String(value));
    }
  });

  const output = params.toString();
  if (output === "") {
    return "";
  }
  // Prepend a question mark to indicate a query string
  return "?" + output;
};
