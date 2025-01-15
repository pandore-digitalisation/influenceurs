import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DataDocument = HydratedDocument<Facebook>;

@Schema({ timestamps: true })
export class Facebook {
  @Prop({ type: [String], required: false })
  userId: string[];
  // @Prop({ required: false })
  // userId: string;

  @Prop({ required: false })
  profileUrl: string;

  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  followers: string;

  @Prop({ required: false })
  following: string;

  @Prop({ required: false })
  plateform: string;

  @Prop({ required: false })
  profileImage: string;
}

export const FacebookSchema = SchemaFactory.createForClass(Facebook);
