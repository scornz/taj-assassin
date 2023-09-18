import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from './game.schema';
import { Model } from 'mongoose';
import { MongoId } from 'utils/mongo';
import { GameNotFoundException } from 'utils/exceptions';

@Injectable()
export class GameService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  async create(
    userId: MongoId,
    name: string,
    requiredEmailHost?: string,
  ): Promise<Game> {
    const game = new this.gameModel();
    game.userId = userId;
    game.name = name;
    game.requiredEmailHost = requiredEmailHost;
    return game.save();
  }

  async findById(gameId: MongoId): Promise<Game> {
    const query = await this.gameModel.find({ _id: gameId });
    if (!query) {
      throw new GameNotFoundException(gameId);
    }
    return query[0];
  }
}
