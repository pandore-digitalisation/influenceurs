import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InstagramModule } from './instagram/instagram.module';
import { LinkedInModule } from './linkedin/linkedin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    InstagramModule,
    LinkedInModule,
  ],
})
export class AppModule {}
