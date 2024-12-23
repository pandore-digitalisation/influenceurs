import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class List extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [String], default: [] })
  profiles: string[];
}

export const ListSchema = SchemaFactory.createForClass(List);
