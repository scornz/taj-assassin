import { BaseResponse } from "shared/api/basic";
import { get } from "../utils/http";

/** Logout of the app */
export const logout = async (): Promise<BaseResponse> => {
  return (await get<BaseResponse>("/auth/logout")).data;
};
