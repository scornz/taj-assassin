import { DetailedTargetInfo, TargetInfo } from "shared/api/game/target";
import { authGet, authPost } from "../../utils/http";
import { LeaderboardPlayerInfo } from "shared/api/game/player";
import { getRecoil } from "recoil-nexus";
import { gameInfoAtom } from "global/user-state";

/** Fetch current target of the active game. */
export const fetchTarget = async (): Promise<TargetInfo> => {
  const info = getRecoil(gameInfoAtom);
  if (!info) throw new Error();

  return (
    await authGet<TargetInfo>(`/game/target/fetchTarget?gameId=${info.gameId}`)
  ).data;
};

/** Fetch leaderboard of the active game. */
export const fetchLeaderboard = async (): Promise<LeaderboardPlayerInfo[]> => {
  const info = getRecoil(gameInfoAtom);
  if (!info) return [];

  return (
    await authGet<LeaderboardPlayerInfo[]>(
      `/game/target/leaderboard?gameId=${info.gameId}`
    )
  ).data;
};

/** ADMIN ONLY: Fetch all targets of the active game. */
export const fetchTargets = async (): Promise<DetailedTargetInfo[]> => {
  const info = getRecoil(gameInfoAtom);
  if (!info) return [];

  return (
    await authGet<DetailedTargetInfo[]>(
      `/game/target/all?gameId=${info.gameId}`
    )
  ).data;
};

/** ADMIN ONLY: Mark a target pair as complete. */
export const killTarget = async (targetId: string) => {
  const info = getRecoil(gameInfoAtom);
  if (!info) return [];

  await authPost<any[]>(
    `/game/target/kill?gameId=${info.gameId}&targetId=${targetId}`
  );
};

/** ADMIN ONLY: Expire all past targets and create new matchings for alive players. */
export const matchTargets = async () => {
  const info = getRecoil(gameInfoAtom);
  if (!info) return;

  await authPost<any[]>(`/game/target/match?gameId=${info.gameId}`);
};
