import { Module } from '@nestjs/common';
import { LinkedinService } from './linkedin.service';
import { LinkedinController } from './linkedin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Linkedin, LinkedinSchema } from './entities/linkedin.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Linkedin.name, schema: LinkedinSchema },
    ]),
  ],
  controllers: [LinkedinController],
  providers: [LinkedinService],
  exports: [LinkedinService],
})
export class LinkedinModule {}
