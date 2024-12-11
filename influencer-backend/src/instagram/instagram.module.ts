import { Module } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { InstagramController } from './instagram.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Instagram } from './entities/instagram.entity';
import mongoose from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Instagram.name, schema: new mongoose.Schema({}) },
    ]),
  ],
  controllers: [InstagramController],
  providers: [InstagramService],
})
export class InstagramModule {}
