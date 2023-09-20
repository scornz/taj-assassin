import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { getUserIdFromRequest } from 'utils/request';
import { Request } from 'express';
import { JwtAuthGuard } from 'auth/guards';
import { MongoId } from 'utils/mongo';
import { ConfigService } from '@nestjs/config';
import { PlayerService } from './player/player.service';

import { GameInfo } from 'shared/api/game';

@Controller('game')
export class GameController {
  constructor(
    private gme: GameService,
    private cfg: ConfigService,
    private plyr: PlayerService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Req() req: Request) {
    const userId = getUserIdFromRequest(req);
    await this.gme.create(userId, 'Testing');
    return { msg: 'success' };
  }

  @Get('getActive')
  @UseGuards(JwtAuthGuard)
  async register(@Req() req: Request): Promise<GameInfo> {
    // Register the requesting user for the active game
    const userId = getUserIdFromRequest(req);
    const gameId = new MongoId(this.cfg.get<string>('ACTIVE_GAME_ID'));
    const game = await this.gme.findById(gameId);

    // Jankily find
    // Please excuse this horrendous code, I did not want to code another method
    const player = await this.plyr.find(userId, gameId);
    const registered = player !== null;

    return {
      gameId: gameId.toString(),
      registered,
      status: game.status,
      name: game.name,
    };
  }
}
