import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DataDocument = HydratedDocument<X>;

@Schema({ timestamps: true })
export class X {
  @Prop({ type: [String], required: false })
  userId: string[];
  // @Prop({ required: true })
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

  @Prop({ required: false })
  description: string;
}

export const XSchema = SchemaFactory.createForClass(X);
