import { BaseResponse } from "shared/api/basic";
import { get } from "../utils/http";

export const logout = async (): Promise<BaseResponse> => {
  return (await get<BaseResponse>("/auth/logout")).data;
};
