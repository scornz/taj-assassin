import { TargetInfo } from "shared/api/game/target";
import { authGet } from "../../utils/http";
import { LeaderboardPlayerInfo } from "shared/api/game/player";
import { getRecoil } from "recoil-nexus";
import { gameInfoAtom } from "global/user-state";

export const fetchTarget = async (): Promise<TargetInfo> => {
  return (await authGet<TargetInfo>("/game/target/fetchTarget")).data;
};

export const fetchLeaderboard = async (): Promise<LeaderboardPlayerInfo[]> => {
  const info = getRecoil(gameInfoAtom);
  if (!info) return [];

  return (
    await authGet<LeaderboardPlayerInfo[]>(
      `/game/target/leaderboard?gameId=${info.gameId}`
    )
  ).data;
};
