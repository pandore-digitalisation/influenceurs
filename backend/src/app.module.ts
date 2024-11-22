import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InstagramModule } from './instagram/instagram.module';
import { LinkedinModule } from './linkedin/linkedin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    InstagramModule,
    LinkedinModule,
  ],
})
export class AppModule {}
