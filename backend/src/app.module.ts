import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InstagramModule } from './instagram/instagram.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    InstagramModule,
  ],
})
export class AppModule {}

// import { Module } from '@nestjs/common';
// import { InstagramController } from './instagram.controller';
// import { InstagramService } from './instagram.service';

// @Module({
//   controllers: [InstagramController],
//   providers: [InstagramService],
// })
// export class InstagramModule {}
