import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Target, TargetDocument, TargetStatus } from './target.schema';
import { Model } from 'mongoose';

// Services
import { GameService } from 'game/game.service';
import { PlayerService } from 'game/player/player.service';

// Utilities
import { MongoId } from 'utils/mongo';
import { shuffle } from 'utils/misc';
import { GameStatus } from 'game/game.schema';
import { PlayerStatus } from 'game/player/player.schema';
import {
  GameStatusNotValidException,
  PlayerStatusNotValidException,
  TargetNotFoundException,
  TargetStatusNotValidException,
} from 'utils/exceptions';

// Objects
import { TargetInfo } from 'shared/api/game/target';
import { UserService } from 'user/user.service';

@Injectable()
export class TargetService {
  constructor(
    @InjectModel(Target.name) private model: Model<Target>,
    private gme: GameService,
    private plyr: PlayerService,
    private usr: UserService,
  ) {}

  async findById(targetId: MongoId): Promise<Target> {
    const query = await this.model.find({ _id: targetId }).exec();
    if (!query) {
      throw new TargetNotFoundException(targetId);
    }
    return query[0];
  }

  async findByGameAndPlayer(
    gameId: MongoId,
    playerId: MongoId,
  ): Promise<Target> {
    const query = await this.model
      .find({
        gameId: gameId,
        playerId: playerId,
        status: TargetStatus.PENDING,
      })
      .exec();
    if (!query) {
      throw new TargetNotFoundException(gameId);
    }
    return query[0];
  }

  async findByGameAndUser(gameId: MongoId, userId: MongoId): Promise<Target> {
    const player = await this.plyr.find(userId, gameId);
    const playerId = new MongoId(player.id);
    return await this.findByGameAndPlayer(gameId, playerId);
  }

  async fetchTarget(userId: MongoId): Promise<TargetInfo> {
    const player = await this.plyr.getByUser_DEPRECATED(userId);
    const playerId = new MongoId(player.id);

    const game = await this.gme.findById(player.gameId);

    if (player.status !== PlayerStatus.ALIVE) {
      // Player is no longer alive and cannot view their target
      throw new PlayerStatusNotValidException(playerId, player.status);
    }

    if (game.status !== GameStatus.IN_PROGRESS) {
      // Player is no longer alive and cannot view their target
      throw new GameStatusNotValidException(player.gameId, game.status);
    }

    const target = await this.findByGameAndPlayer(player.gameId, playerId);
    const targetPlayer = await this.plyr.findById(target.targetId);
    const targetUser = await this.usr.findById(targetPlayer.userId);
    return {
      name: `${targetUser.firstName} ${targetUser.surname}`,
    };
  }

  /**
   * Create targets for all alive players in a game. Expire all pending targets,
   * deactivating them.
   * @param gameId The game in question
   * @param userId The user to register for the game in question
   */
  async matchPlayers(gameId: MongoId) {
    const game = await this.gme.findById(gameId);

    // Get all alive players, randomized order
    const players = shuffle(await this.plyr.findByGameAndStatus(gameId));

    const targetDocuments: TargetDocument[] = [];
    // Create and assign
    for (let i = 0; i < players.length; i++) {
      const target = new this.model();
      target.gameId = gameId;
      target.playerId = new MongoId(players[i].id);
      target.targetId = new MongoId(players[(i + 1) % players.length].id);
      targetDocuments.push(target);
    }

    // Set all pending targets to be expired for this game
    await this.model
      .find()
      .updateMany(
        { gameId: gameId, status: TargetStatus.PENDING },
        { $set: { status: TargetStatus.EXPIRED } },
      )
      .exec();

    // Assign new targets
    await this.model.insertMany(targetDocuments);

    // Update the game status if it is not there already
    await game.updateOne({ $set: { status: GameStatus.IN_PROGRESS } }).exec();
  }

  async killTarget(gameId: MongoId, targetId: MongoId) {
    // Grab the game to make sure it exists
    await this.gme.findById(gameId);

    const target = await this.findById(targetId);

    // Make sure the target is marked as pending
    if (target.status !== TargetStatus.PENDING) {
      throw new TargetStatusNotValidException(targetId, target.status);
    }

    const playerId = target.playerId;
    const killedId = target.targetId;
    const player = await this.plyr.findById(playerId);
    const killed = await this.plyr.findById(killedId);
    const killedTarget = await this.findByGameAndPlayer(gameId, killedId);

    // Make sure player is alive
    if (player.status !== PlayerStatus.ALIVE) {
      throw new PlayerStatusNotValidException(playerId, player.status);
    }

    // Make sure the person about to be killed is alive
    if (killed.status !== PlayerStatus.ALIVE) {
      throw new PlayerStatusNotValidException(killedId, killed.status);
    }

    killed.status = PlayerStatus.KILLED;
    killed.save();

    target.status = TargetStatus.COMPLETE;
    target.save();

    killedTarget.status = TargetStatus.USER_KILLED;
    killedTarget.save();

    // Create new pending target for the killer
    const newTarget = new this.model();
    target.gameId = gameId;
    target.targetId = killedTarget.targetId;
    newTarget.save();
  }

  async getLeaderboard(gameId: MongoId) {
    const game = await this.gme.findById(gameId);

    const players = await this.plyr.findByGame(gameId);
  }
}
