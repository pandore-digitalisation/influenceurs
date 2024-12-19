import { Injectable } from '@nestjs/common';
import { XService } from '../x/x.service';
import { InstagramService } from '../instagram/instagram.service';
import { FacebookService } from '../facebook/facebook.service';
import { LinkedinService } from '../linkedin/linkedin.service';

@Injectable()
export class AllService {
  constructor(
    private readonly xService: XService,
    private readonly instagramService: InstagramService,
    private readonly facebookService: FacebookService,
    private readonly linkedInService: LinkedinService,
  ) {}

  async getAllPlatformData() {
    const xData = await this.xService.findAll();
    const instagramData = await this.instagramService.findAll();
    const facebookData = await this.facebookService.findAll();
    const linkedInData = await this.linkedInService.findAll();

    return [...xData, ...instagramData, ...facebookData, ...linkedInData];
  }
}

// import { Injectable } from '@nestjs/common';
// import { CreateAllDto } from './dto/create-all.dto';
// import { UpdateAllDto } from './dto/update-all.dto';

// @Injectable()
// export class AllService {
//   create(createAllDto: CreateAllDto) {
//     return 'This action adds a new all';
//   }

//   findAll() {
//     return `This action returns all all`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} all`;
//   }

//   update(id: number, updateAllDto: UpdateAllDto) {
//     return `This action updates a #${id} all`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} all`;
//   }
// }
