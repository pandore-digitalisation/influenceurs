import { Module } from '@nestjs/common';
import { XService } from './x.service';
import { XController } from './x.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { X, XSchema } from './entities/x.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: X.name, schema: XSchema }])],
  controllers: [XController],
  providers: [XService],
  exports: [XService],
})
export class XModule {}
