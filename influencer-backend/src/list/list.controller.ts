import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ListService } from './list.service';
import { List } from './entities/list.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateListDto } from './dto/create-list.dto';

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  // Route pour obtenir toutes les listes
  @Get()
  async findAll(): Promise<List[]> {
    return this.listService.findAll();
  }

  // Route pour obtenir une liste spécifique par son ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<List> {
    return this.listService.findOne(id);
  }

  // Route pour créer une nouvelle liste
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req,
    @Body() createListDto: CreateListDto,
  ): Promise<List> {
    const userId = req.user ? req.user.userId : '0';
    if (!userId) {
      throw new Error('User ID is missing');
    }
    return this.listService.create(userId, createListDto);
  }

  // Route pour mettre à jour une liste en ajoutant ou supprimant des profils
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    data: { name?: string; profiles?: { add?: string[]; remove?: string[] } },
  ): Promise<List> {
    return this.listService.update(id, data);
  }

  // Route pour supprimer une liste
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.listService.delete(id);
  }
}

// import {
//   Controller,
//   Get,
//   Post,
//   Delete,
//   Body,
//   Param,
//   Put,
// } from '@nestjs/common';
// import { ListService } from './list.service';

// @Controller('lists')
// export class ListController {
//   constructor(private readonly listService: ListService) {}

//   @Get()
//   async findAll() {
//     return this.listService.findAll();
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string) {
//     return this.listService.findOne(id);
//   }

//   @Post()
//   async create(@Body() body: { name: string }) {
//     return this.listService.create(body);
//   }

//   @Put(':id')
//   async update(
//     @Param('id') id: string,
//     @Body() body: { name?: string; profiles?: string[] },
//   ) {
//     return this.listService.update(id, body);
//   }

//   @Delete(':id')
//   async delete(@Param('id') id: string) {
//     return this.listService.delete(id);
//   }
// }
