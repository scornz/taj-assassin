import { syncFunction } from "./misc";
import { authGet, catchError, get } from "./http";
import { getRecoil, setRecoil } from "recoil-nexus";
import {
  accessTokenAtom,
  accessTokenExpiryAtom,
  userIDAtom,
} from "../global/user-state";

/* Sees if tokens are almost invalid, and refreshes them if necessary. Returns
TRUE if they were unexpired (and not refreshed) and FALSE otherwise (and hence
refreshed ) */
export const validateTokens = async () => {
  // Get global expiry variable
  const expiry = getRecoil(accessTokenExpiryAtom);

  // Make sure expiry is not null
  if (expiry == null) {
    await refreshTokens();
    return false;
  }

  const currentDate = new Date(Date.now());
  // If our tokens have expired / are close to expiring
  if (expiry <= currentDate) {
    // Refresh them before returning
    await refreshTokens();
    return false;
  }

  return true;
};

export const refreshTokens = syncFunction(async () => {
  // Get global https variables
  const expiry = getRecoil(accessTokenExpiryAtom);

  try {
    // Update to be safe if this is null
    if (expiry != null) {
      // Re-check expiry and current date since this can only be called concurrently
      const currentDate = new Date(Date.now());
      // Just return if this has been updated already
      // This means there were concurrent calls, and this one was second
      if (expiry > currentDate) {
        return;
      }
    }

    await requestTokens();
  } catch (e) {
    // There was some error
    catchError("Error grabbing new refresh token:", e);
  }
});

export const requestTokens = async () => {
  // Grab refresh token from storage, if it exists
  const res = await get<{ token: string; expires: string; userId: string }>(
    "/auth/refresh"
  );
  // Set our global variables
  setRecoil(userIDAtom, res.data.userId);
  setRecoil(accessTokenExpiryAtom, new Date(Date.parse(res.data.expires)));
  setRecoil(accessTokenAtom, res.data.token);
};

export const verify = async () => {
  // Simply call to make sure access token is valid
  await authGet("/auth/verify");
};
