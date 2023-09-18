import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { MongoId } from '../utils/mongo';

export type GameDocument = HydratedDocument<Game>;

/**
 * Status of the target, whether they are alive and what not
 */
export enum GameStatus {
  /**
   * This game hasn't started yet, and people may still register
   */
  SETUP = 'SETUP',
  /**
   * This game is in progress, and people are actively playing
   */
  IN_PROGRESS = 'IN_PROGRESS',
  /**
   * This game is complete, someone won
   */
  COMPLETE = 'COMPLETE',
  /**
   * This game was cancelled, and never completed
   */
  CANCELLED = 'CANCELLED',
}

@Schema()
export class Game extends mongoose.Document<mongoose.Schema.Types.ObjectId> {
  /**
   * The creator/admin of this particular game
   */
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  userId: MongoId;
  /**
   * The name of this game
   */
  @Prop({ type: String, required: true })
  name: string;

  /**
   * The status of the game
   */
  @Prop({ type: String, enum: GameStatus, default: GameStatus.SETUP })
  status: string;

  /**
   * Only emails in this domain are allowed to be signed up to this game
   */
  @Prop({ type: String })
  requiredEmailHost: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
