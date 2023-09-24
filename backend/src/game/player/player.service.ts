import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GameService } from 'game/game.service';
import { UserService } from 'user/user.service';
import { MongoId } from 'utils/mongo';
import { Player, PlayerStatus } from './player.schema';
import { Model } from 'mongoose';
import { GameStatus } from 'game/game.schema';
import {
  EmailNotWhitelistedException,
  GameStatusNotValidException,
  PlayerAlreadyRegisteredException,
  PlayerNotFoundException,
} from 'utils/exceptions';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel(Player.name) private model: Model<Player>,
    private gme: GameService,
    private usr: UserService,
  ) {}

  /**
   * Register a given user to play a game.
   * @param gameId The game in question
   * @param userId The user to register for the game in question
   */
  async register(userId: MongoId, gameId: MongoId) {
    const game = await this.gme.findById(gameId);
    const user = await this.usr.findById(userId);

    // Only allow for player's to register while the game is in setup mode
    if (game.status != GameStatus.SETUP) {
      throw new GameStatusNotValidException(gameId, game.status);
    }

    // If the game has listed a bunch of emails, make sure to check our email is there
    if (game.whitelistedEmails) {
      if (!game.whitelistedEmails.includes(user.email)) {
        throw new EmailNotWhitelistedException(userId, gameId);
      }
    }

    // Make sure the player isn't already registered
    if ((await this.find(userId, gameId)) === null) {
      const player = new this.model();
      player.gameId = gameId;
      player.userId = userId;
      player.save();
    }
  }

  async find(userId: MongoId, gameId: MongoId): Promise<Player | null> {
    return await this.model
      .find({ gameId: gameId, userId: userId })
      .findOne()
      .exec();
  }

  /**
   * Get a player simply via their user ID. NOTE: This just gets the most
   * recent player, and totally breaks when there are multiple games.
   * @param userId The ID of the user to find
   */
  async getByUser_DEPRECATED(userId: MongoId): Promise<Player> {
    return await this.model
      .find({ userId: userId })
      .sort({ _id: -1 })
      .findOne()
      .exec();
  }

  async findById(playerId: MongoId): Promise<Player> {
    const query = await this.model.find({ _id: playerId }).exec();
    if (!query) {
      throw new PlayerNotFoundException(playerId);
    }

    return query[0];
  }

  async findByGameAndStatus(
    gameId: MongoId,
    status: PlayerStatus = PlayerStatus.ALIVE,
  ): Promise<Player[]> {
    return await this.model.find({ gameId: gameId, status }).exec();
  }

  async findByGame(gameId: MongoId): Promise<Player[]> {
    return await this.model.find({ gameId: gameId }).exec();
  }
}
