import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { MongoId } from 'utils/mongo';

export type TargetDocument = HydratedDocument<Target>;

/**
 * Status of the target, whether they are alive and what not
 */
export enum TargetStatus {
  /**
   * This target is still valid, but nothing has happened.
   */
  PENDING = 'PENDING',
  /**
   * This target has expired, and it is no longer active.
   * */
  EXPIRED = 'EXPIRED',
  /**
   * This target has been a successful kill! A new target has been created for user
   * targetId is out of the game.
   */
  COMPLETE = 'COMPLETE',
  /**
   * This target is no longer valid because the user was killed.
   * */
  USER_KILLED = 'USER_KILLED',
}

@Schema()
export class Target extends mongoose.Document<mongoose.Schema.Types.ObjectId> {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  playerId: MongoId;

  /**
   * The game that this assigned target is within
   */
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  gameId: MongoId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  targetId: MongoId;

  @Prop({ type: String, enum: TargetStatus, default: TargetStatus.PENDING })
  status: string;
}

export const TargetSchema = SchemaFactory.createForClass(Target);
