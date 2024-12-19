import { Module } from '@nestjs/common';
import { AllService } from './all.service';
import { AllController } from './all.controller';
import { XModule } from '../x/x.module';
import { InstagramModule } from '../instagram/instagram.module';
import { FacebookModule } from '../facebook/facebook.module';
import { LinkedinModule } from '../linkedin/linkedin.module';

@Module({
  imports: [XModule, InstagramModule, FacebookModule, LinkedinModule], // Importer les modules nécessaires
  controllers: [AllController],
  providers: [AllService],
})
export class AllModule {}

// import { Module } from '@nestjs/common';
// import { AllService } from './all.service';
// import { AllController } from './all.controller';

// @Module({
//   controllers: [AllController],
//   providers: [AllService],
// })
// export class AllModule {}
