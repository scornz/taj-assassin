import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends mongoose.Document {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  surname: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String })
  profilePic: string;

  @Prop({ type: Boolean, default: false })
  contactVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
