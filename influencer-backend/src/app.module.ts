import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InstagramModule } from './instagram/instagram.module';
import { ListModule } from './list/list.module';
import { FacebookModule } from './facebook/facebook.module';
import { LinkedinModule } from './linkedin/linkedin.module';
import { XModule } from './x/x.module';
import { AllModule } from './all/all.module';
import { AuthModule } from './auth/auth.module';
import { TiktokModule } from './tiktok/tiktok.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://aces:EM953DmWGzFuPU0c@cluster0.v6z3v.mongodb.net/', // Cluster URL
    ),
    InstagramModule,
    ListModule,
    FacebookModule,
    LinkedinModule,
    XModule,
    AllModule,
    AuthModule,
    TiktokModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
