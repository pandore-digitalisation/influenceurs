import { Controller, Get } from '@nestjs/common';
import { AllService } from './all.service';

@Controller('platforms')
export class AllController {
  constructor(private readonly AllService: AllService) {}

  @Get('all')
  async getAllPlatforms() {
    try {
      const data = await this.AllService.getAllPlatformData();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      return {
        success: false,
        message: 'Erreur lors de la récupération des données.',
      };
    }
  }

  @Get('linkedin')
  async getProfilesByPlate() {}
}

// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { AllService } from './all.service';
// import { CreateAllDto } from './dto/create-all.dto';
// import { UpdateAllDto } from './dto/update-all.dto';

// @Controller('all')
// export class AllController {
//   constructor(private readonly allService: AllService) {}

//   @Post()
//   create(@Body() createAllDto: CreateAllDto) {
//     return this.allService.create(createAllDto);
//   }

//   @Get()
//   findAll() {
//     return this.allService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.allService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateAllDto: UpdateAllDto) {
//     return this.allService.update(+id, updateAllDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.allService.remove(+id);
//   }
// }
