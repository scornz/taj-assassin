import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { getUserIdFromRequest } from 'utils/request';
import { Request } from 'express';
import { JwtAuthGuard } from 'auth/guards';
import { MongoId } from 'utils/mongo';
import { ConfigService } from '@nestjs/config';

import { GameInfo } from 'shared/api/game';
import { PlayerService } from './player/player.service';
import { PlayerRole } from './player/player.schema';

@Controller('game')
export class GameController {
  constructor(
    private gme: GameService,
    private cfg: ConfigService,
    private plyr: PlayerService,
  ) {}

  @Get('getActive')
  @UseGuards(JwtAuthGuard)
  async register(@Req() req: Request): Promise<GameInfo> {
    // Register the requesting user for the active game
    const userId = getUserIdFromRequest(req);
    const gameId = new MongoId(this.cfg.get<string>('ACTIVE_GAME_ID'));
    const game = await this.gme.findById(gameId);

    // Fetch the user's role in a part of this game
    const role = await this.plyr.getRole(gameId, userId);
    const registered = role == PlayerRole.PLAYER;

    // Grab the list of events for this game, and convert the time to a standardized ISO string
    const events: { title: string; time: string }[] = [];
    if (game.events) {
      game.events.forEach((e) => {
        events.push({ title: e.title, time: e.time.toISOString() });
      });
    }

    return {
      gameId: gameId.toString(),
      registered,
      status: game.status,
      role: role,
      name: game.name,
      events: events,
      safeties: game.safeties,
      startTime: game.startTime.toISOString(),
    };
  }
}
