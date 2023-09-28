import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TargetService } from './target.service';
import { JwtAuthGuard } from 'auth/guards';
import { getUserIdFromRequest } from 'utils/request';
import { Request } from 'express';
import { QueryRequired } from 'utils/decorators';
import { MongoId } from 'utils/mongo';

@Controller('game/target')
export class TargetController {
  constructor(private trgt: TargetService) {}

  @Get('fetchTarget')
  @UseGuards(JwtAuthGuard)
  async fetchTarget(
    @Req() req: Request,
    @QueryRequired('gameId') gameIdQuery: string,
  ) {
    const userId = getUserIdFromRequest(req);
    const gameId = new MongoId(gameIdQuery);
    const data = await this.trgt.fetchTarget(gameId, userId);
    return data;
  }

  @Get('leaderboard')
  @UseGuards(JwtAuthGuard)
  async fetchLeaderboard(
    @Req() req: Request,
    @QueryRequired('gameId') gameIdQuery: string,
  ) {
    const gameId = new MongoId(gameIdQuery);
    const data = await this.trgt.fetchLeaderboard(gameId);
    return data;
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async fetchTargets(
    @Req() req: Request,
    @QueryRequired('gameId') gameIdQuery: string,
  ) {
    const gameId = new MongoId(gameIdQuery);
    const userId = getUserIdFromRequest(req);
    const data = await this.trgt.fetchTargets(userId, gameId);
    return data;
  }

  @Post('match')
  @UseGuards(JwtAuthGuard)
  async matchTargets(
    @Req() req: Request,
    @QueryRequired('gameId') gameIdQuery: string,
  ) {
    const gameId = new MongoId(gameIdQuery);
    const userId = getUserIdFromRequest(req);
    const data = await this.trgt.matchPlayers(userId, gameId);
    return data;
  }

  @Post('kill')
  @UseGuards(JwtAuthGuard)
  async killTarget(
    @Req() req: Request,
    @QueryRequired('gameId') gameIdQuery: string,
    @QueryRequired('targetId') targetIdQuery: string,
  ) {
    const gameId = new MongoId(gameIdQuery);
    const targetId = new MongoId(targetIdQuery);
    const userId = getUserIdFromRequest(req);
    const data = await this.trgt.killTarget(userId, gameId, targetId);
    return data;
  }
}
