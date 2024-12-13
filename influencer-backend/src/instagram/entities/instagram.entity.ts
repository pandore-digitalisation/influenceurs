// src/data/entities/data.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DataDocument = HydratedDocument<Instagram>;

@Schema()
export class Instagram {
  @Prop({ required: false })
  profileUrl: string;

  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  followers: string;

  @Prop({ required: false })
  posts: string;

  @Prop({ required: false })
  following: string;

  @Prop({ required: false })
  plateform: string;

  @Prop({ required: false })
  profileImg: string;
}

export const InstagramSchema = SchemaFactory.createForClass(Instagram);
