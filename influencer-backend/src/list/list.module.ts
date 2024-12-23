import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { List, ListSchema } from './entities/list.entity';
import { ListService } from './list.service';
import { ListController } from './list.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]),
  ],
  providers: [ListService],
  controllers: [ListController],
})
export class ListModule {}
