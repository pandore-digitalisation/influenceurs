import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Importer HttpModule
import { InstagramService } from './instagram.service';
import { InstagramController } from './instagram.controller';

@Module({
  imports: [HttpModule], // HttpModule imports
  providers: [InstagramService],
  controllers: [InstagramController],
})
export class InstagramModule {}
