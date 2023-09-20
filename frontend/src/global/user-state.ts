import { atom } from "recoil";
import { GameInfo } from "shared/api/game";

/* UserID of the currently logged in user */
export const userIDAtom = atom<string | undefined>({
  key: "userID",
  default: undefined,
});

/* Game info of the currently active game */
export const gameInfoAtom = atom<undefined | GameInfo>({
  key: "gameInfo",
  default: undefined,
});

/* Authentication access token of the currently logged in user */
export const accessTokenAtom = atom<string | undefined>({
  key: "accessToken",
  default: undefined,
});

/* Time of expiry of the authentication access token
of the currently logged in user */
export const accessTokenExpiryAtom = atom<Date | undefined>({
  key: "expiry",
  default: undefined,
});
