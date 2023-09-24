export type GameInfo = {
  name: string;
  gameId: string;
  status: string;
  registered: boolean;
  events: { title: string; time: string }[];
  startTime: string;
  safeties: string[];
};
