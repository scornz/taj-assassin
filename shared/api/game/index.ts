/**
 * Return type from /game/getActive
 */
export type GameInfo = {
  name: string;
  gameId: string;
  status: string;
  registered: boolean;
  role: string;
  events: { title: string; time: string }[];
  startTime: string;
  safeties: string[];
};
