import { Module } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { InstagramController } from './instagram.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Instagram, InstagramSchema } from './entities/instagram.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Instagram.name, schema: InstagramSchema },
    ]),
  ],
  controllers: [InstagramController],
  providers: [InstagramService],
})
export class InstagramModule {}
