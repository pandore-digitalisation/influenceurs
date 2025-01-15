import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { CreateInstagramDto } from './dto/create-instagram.dto';
import { UpdateInstagramDto } from './dto/update-instagram.dto';
import { Instagram } from './entities/instagram.entity';

@Controller('instagram')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}

  @Post()
  async create(
    @Body() createInstagramDto: CreateInstagramDto,
  ): Promise<Instagram> {
    return this.instagramService.create(createInstagramDto);
  }

  @Post('create-profile')
  async createProfile(
    @Body()
    {
      createInstagramDto,
      userId,
    }: {
      createInstagramDto: CreateInstagramDto;
      userId: string | string[];
    },
  ): Promise<Instagram> {
    if (Array.isArray(userId)) {
      throw new Error('Expected a single userId, but received an array');
    }
    return this.instagramService.createProfile(createInstagramDto, userId);
  }

  @Get()
  findAll() {
    return this.instagramService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.instagramService.findOne(id);
  }
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateInstagramDto: UpdateInstagramDto,
  ) {
    return this.instagramService.update(id, updateInstagramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.instagramService.remove(id);
  }
}
