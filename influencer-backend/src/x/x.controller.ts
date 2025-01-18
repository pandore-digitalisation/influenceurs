import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { XService } from './x.service';
import { CreateXDto } from './dto/create-x.dto';
import { UpdateXDto } from './dto/update-x.dto';
import { X } from './entities/x.entity';

@Controller('x')
export class XController {
  constructor(private readonly xService: XService) {}

  @Post()
  async create(@Body() createXDto: CreateXDto): Promise<X> {
    return this.xService.create(createXDto);
  }

  @Post('create-profile')
  async createProfile(
    @Body()
    {
      createXDto,
      userId,
    }: {
      createXDto: CreateXDto;
      userId: string | string[];
    },
  ): Promise<X> {
    if (Array.isArray(userId)) {
      throw new Error('Expected a single userId, but received an array');
    }
    return this.xService.createProfile(createXDto, userId);
  }

  @Get()
  findAll() {
    return this.xService.findAll();
  }

  @Get(':profileUrl')
  async getProfileByUrl(@Param('profileUrl') profileUrl: string) {
    return this.xService.getProfileByUrl(profileUrl);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.xService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateXDto: UpdateXDto) {
    return this.xService.update(+id, updateXDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.xService.remove(id);
  }
}
