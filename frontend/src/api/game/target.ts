import { TargetInfo } from "shared/api/game/target";
import { authGet } from "../../utils/http";

export const fetchTarget = async (): Promise<TargetInfo> => {
  return (await authGet<TargetInfo>("/game/target/fetchTarget")).data;
};
