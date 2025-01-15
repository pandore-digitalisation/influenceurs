import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DataDocument = HydratedDocument<Linkedin>;

@Schema({ timestamps: true })
export class Linkedin {
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
  location: string;

  @Prop({ required: false })
  connection: string;

  @Prop({ required: false })
  plateform: string;

  @Prop({ required: false })
  profileImage: string;

  @Prop({ required: false })
  description: string;
}

export const LinkedinSchema = SchemaFactory.createForClass(Linkedin);
