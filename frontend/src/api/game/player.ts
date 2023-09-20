import { TargetInfo } from "shared/api/game/target";
import { authGet, authPost } from "../../utils/http";

export const register = async (gameId: string) => {
  await authPost(`/game/player/register?gameId=${gameId}`);
};
