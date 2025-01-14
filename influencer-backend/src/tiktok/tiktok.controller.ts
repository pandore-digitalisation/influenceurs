import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TiktokService } from './tiktok.service';
import { CreateTiktokDto } from './dto/create-tiktok.dto';
import { UpdateTiktokDto } from './dto/update-tiktok.dto';
import { Tiktok } from './entities/tiktok.entity';

@Controller('tiktok')
export class TiktokController {
  constructor(private readonly tiktokService: TiktokService) {}

  @Post()
  async create(@Body() createTiktokDto: CreateTiktokDto): Promise<Tiktok> {
    return this.tiktokService.create(createTiktokDto);
  }

  @Post('create-profile')
  async createProfile(
    @Body()
    {
      createTiktokDto,
      userId,
    }: {
      createTiktokDto: CreateTiktokDto;
      userId: string | string[];
    },
  ): Promise<Tiktok> {
    if (Array.isArray(userId)) {
      throw new Error('Expected a single userId, but received an array');
    }
    return this.tiktokService.createProfile(createTiktokDto, userId);
  }

  @Get()
  findAll() {
    return this.tiktokService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiktokService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiktokDto: UpdateTiktokDto) {
    return this.tiktokService.update(id, updateTiktokDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiktokService.remove(+id);
  }
}

// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
// } from '@nestjs/common';
// import { TiktokService } from './tiktok.service';
// import { CreateTiktokDto } from './dto/create-tiktok.dto';
// import { UpdateTiktokDto } from './dto/update-tiktok.dto';
// import { Tiktok } from './entities/tiktok.entity';

// @Controller('tiktok')
// export class TiktokController {
//   constructor(private readonly tiktokService: TiktokService) {}

//   @Post()
//   create(@Body() createTiktokDto: CreateTiktokDto): Promise<Tiktok> {
//     return this.tiktokService.create(createTiktokDto);
//   }

//   @Get()
//   findAll() {
//     return this.tiktokService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.tiktokService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateTiktokDto: UpdateTiktokDto) {
//     return this.tiktokService.update(id, updateTiktokDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.tiktokService.remove(+id);
//   }
// }
