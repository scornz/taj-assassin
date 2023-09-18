import { atom } from "recoil";

/* UserID of the currently logged in user */
export const userIDAtom = atom<string | undefined>({
  key: "userID",
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
