import { Module } from '@nestjs/common';
import { TiktokService } from './tiktok.service';
import { TiktokController } from './tiktok.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tiktok, TiktokSchema } from './entities/tiktok.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tiktok.name, schema: TiktokSchema }]),
  ],
  controllers: [TiktokController],
  providers: [TiktokService],
  exports: [TiktokService],
})
export class TiktokModule {}
