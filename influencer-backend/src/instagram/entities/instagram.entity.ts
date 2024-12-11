// src/data/entities/data.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DataDocument = HydratedDocument<Instagram>;

@Schema()
export class Instagram {
  @Prop({ required: false })
  url: string;

  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  followers: string;

  @Prop({ required: false })
  post: string;

  @Prop({ required: false })
  following: string;
}

export const DataSchema = SchemaFactory.createForClass(Instagram);
