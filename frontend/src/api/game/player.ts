import { authPost } from "../../utils/http";

/**
 * Register a player for the given game
 */
export const register = async (gameId: string) => {
  await authPost(`/game/player/register?gameId=${gameId}`);
};
