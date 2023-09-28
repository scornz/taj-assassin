import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from './game.schema';
import { Model } from 'mongoose';
import { MongoId } from 'utils/mongo';
import { GameNotFoundException } from 'utils/exceptions';
import { UserService } from 'user/user.service';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<Game>,
    private usr: UserService,
  ) {}

  async create(name: string, whitelistedEmails: string[]): Promise<Game> {
    const game = new this.gameModel();
    game.name = name;
    game.whitelistedEmails = whitelistedEmails;
    return game.save();
  }

  async findById(gameId: MongoId): Promise<Game> {
    const query = await this.gameModel.find({ _id: gameId });
    if (query.length == 0) {
      throw new GameNotFoundException(gameId);
    }
    return query[0];
  }
}
