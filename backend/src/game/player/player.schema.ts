import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { MongoId } from 'utils/mongo';

export type PlayerDocument = HydratedDocument<Player>;

export enum PlayerStatus {
  /**
   * This player is still alive and playing
   */
  ALIVE = 'ALIVE',
  /**
   * This player has been killed and is no longer in the game.
   * */
  KILLED = 'KILLED',
  /**
   * This player was manually disqualified for breaking the rules
   * */
  DISQUALIFIED = 'DISQUALIFIED',
}

/**
 * Describes the role of a user's role in a particular game
 */
export enum PlayerRole {
  // User is an admin for this game and can conduct admin actions as such
  // This user cannot register for the game
  ADMIN = 'ADMIN',
  // User is a player for this game
  PLAYER = 'PLAYER',
  // This user is neither registered, nor an admin
  NONE = 'NONE',
}

@Schema()
export class Player extends mongoose.Document<mongoose.Schema.Types.ObjectId> {
  /**
   * The user that this player was created by.
   */
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  userId: MongoId;

  /**
   * The game that this user is a part of.
   */
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  gameId: MongoId;

  /**
   * The game that this user is a part of.
   */
  @Prop({ type: String, enum: PlayerStatus, default: PlayerStatus.ALIVE })
  status: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
