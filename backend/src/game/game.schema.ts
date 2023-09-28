import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

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
export class GameEvent extends mongoose.Document<mongoose.Schema.Types.ObjectId> {
  /**
   * The name of the event
   */
  @Prop({ type: String, required: true })
  title: string;

  /**
   * The name of the event
   */
  @Prop({ type: Date, required: true })
  time: Date;
}

const GameEventSchema = SchemaFactory.createForClass(GameEvent);

@Schema()
export class Game extends mongoose.Document<mongoose.Schema.Types.ObjectId> {
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
   * The time that the game starts
   */
  @Prop({ type: Date, required: true })
  startTime: Date;

  /**
   * A list of emails that are allowed to join this event
   */
  @Prop({ type: [String], required: false, default: [] })
  whitelistedEmails: string[];

  /**
   * A list of emails that are authenticated to do admin related tasks for
   * this game.
   */
  @Prop({ type: [String], required: false, default: [] })
  admins: string[];

  /**
   * A list of emails that are allowed to join this event
   */
  @Prop({ type: [GameEventSchema], required: false, default: [] })
  events: GameEvent[];

  /**
   * A list of daily safeties that are enacted, shown 1 a day starting at startTime
   */
  @Prop({ type: [String], required: false, default: [] })
  safeties: string[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
