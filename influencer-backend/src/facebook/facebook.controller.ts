import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FacebookService } from './facebook.service';
import { CreateFacebookDto } from './dto/create-facebook.dto';
import { UpdateFacebookDto } from './dto/update-facebook.dto';
import { Facebook } from './entities/facebook.entity';

@Controller('facebook')
export class FacebookController {
  constructor(private readonly facebookService: FacebookService) {}

  @Post()
  async create(
    @Body() createFacebookDto: CreateFacebookDto,
  ): Promise<Facebook> {
    return this.facebookService.create(createFacebookDto);
  }

  @Post('create-profile')
  async createProfile(
    @Body()
    {
      createFacebookDto,
      userId,
    }: {
      createFacebookDto: CreateFacebookDto;
      userId: string | string[];
    },
  ): Promise<Facebook> {
    if (Array.isArray(userId)) {
      throw new Error('Expected a single userId, but received an array');
    }
    return this.facebookService.createProfile(createFacebookDto, userId);
  }

  @Get(':profileUrl')
  async getProfileByUrl(@Param('profileUrl') profileUrl: string) {
    return this.facebookService.getProfileByUrl(profileUrl);
  }

  @Get()
  findAll() {
    return this.facebookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facebookService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateFacebookDto: UpdateFacebookDto,
  ) {
    return this.facebookService.update(id, updateFacebookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facebookService.remove(+id);
  }
}
