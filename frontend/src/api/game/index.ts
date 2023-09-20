import { gameInfoAtom } from "global/user-state";
import { setRecoil } from "recoil-nexus";
import { GameInfo } from "shared/api/game";
import { authGet } from "utils/http";

export const getActiveGame = async (): Promise<GameInfo> => {
  const activeGame = (await authGet<GameInfo>("/game/getActive")).data;
  setRecoil(gameInfoAtom, activeGame);
  return activeGame;
};
