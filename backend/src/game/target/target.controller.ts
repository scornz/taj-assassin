import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { TargetService } from './target.service';
import { JwtAuthGuard } from 'auth/guards';
import { getUserIdFromRequest } from 'utils/request';
import { Request } from 'express';

@Controller('game/target')
export class TargetController {
  constructor(private trgt: TargetService) {}

  @Get('fetchTarget')
  @UseGuards(JwtAuthGuard)
  async fetchTarget(@Req() req: Request) {
    const userId = getUserIdFromRequest(req);
    const data = await this.trgt.fetchTarget(userId);
    return data;
  }
}
