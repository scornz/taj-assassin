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
