import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LinkedinService } from './linkedin.service';
import { CreateLinkedinDto } from './dto/create-linkedin.dto';
import { UpdateLinkedinDto } from './dto/update-linkedin.dto';
import { Linkedin } from './entities/linkedin.entity';

@Controller('linkedin')
export class LinkedinController {
  constructor(private readonly linkedinService: LinkedinService) {}

  @Post()
  async create(
    @Body() createLinkedinDto: CreateLinkedinDto,
  ): Promise<Linkedin> {
    return this.linkedinService.create(createLinkedinDto);
  }

  @Get()
  findAll() {
    return this.linkedinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linkedinService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLinkedinDto: UpdateLinkedinDto,
  ) {
    return this.linkedinService.update(id, updateLinkedinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkedinService.remove(id);
  }
}
