import { TargetInfo } from "shared/api/game/target";
import { authGet, authPost } from "../../utils/http";
import { LeaderboardPlayerInfo } from "shared/api/game/player";
import { getRecoil } from "recoil-nexus";
import { gameInfoAtom } from "global/user-state";

export const fetchTarget = async (): Promise<TargetInfo> => {
  const info = getRecoil(gameInfoAtom);
  if (!info) throw new Error();

  return (
    await authGet<TargetInfo>(`/game/target/fetchTarget?gameId=${info.gameId}`)
  ).data;
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

export const fetchTargets = async (): Promise<any[]> => {
  const info = getRecoil(gameInfoAtom);
  if (!info) return [];

  return (await authGet<any[]>(`/game/target/all?gameId=${info.gameId}`)).data;
};

export const killTarget = async (targetId: string) => {
  const info = getRecoil(gameInfoAtom);
  if (!info) return [];

  await authPost<any[]>(
    `/game/target/kill?gameId=${info.gameId}&targetId=${targetId}`
  );
};

export const matchTargets = async () => {
  const info = getRecoil(gameInfoAtom);
  if (!info) return;

  await authPost<any[]>(`/game/target/match?gameId=${info.gameId}`);
};
