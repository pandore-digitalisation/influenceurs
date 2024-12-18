import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InstagramModule } from './instagram/instagram.module';
import { ListModule } from './list/list.module';
import { FacebookModule } from './facebook/facebook.module';
import { LinkedinModule } from './linkedin/linkedin.module';
import { XModule } from './x/x.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://aces:EM953DmWGzFuPU0c@cluster0.v6z3v.mongodb.net/', // Cluster URL
    ),
    InstagramModule,
    ListModule,
    FacebookModule,
    LinkedinModule,
    XModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
