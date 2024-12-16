import { Module } from '@nestjs/common';
import { FacebookService } from './facebook.service';
import { FacebookController } from './facebook.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Facebook, FacebookSchema } from './entities/facebook.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Facebook.name, schema: FacebookSchema },
    ]),
  ],
  controllers: [FacebookController],
  providers: [FacebookService],
})
export class FacebookModule {}
