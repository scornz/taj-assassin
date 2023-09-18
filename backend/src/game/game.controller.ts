import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { getUserIdFromRequest } from 'utils/request';
import { Request } from 'express';
import { JwtAuthGuard } from 'auth/guards';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Req() req: Request) {
    const userId = getUserIdFromRequest(req);
    await this.gameService.create(userId, 'Testing');
    return { msg: 'success' };
  }
}
