export type LeaderboardPlayerInfo = {
  playerId: string;
  name: string;
  kills: number;
  alive: boolean;

  // Name of the killer
  killedBy?: string;
};
