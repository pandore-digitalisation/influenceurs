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

  // Route pour créer une liste par défaut pour un utilisateur
  @UseGuards(JwtAuthGuard)
  @Post('default')
  async createDefaultForUser(@Req() req): Promise<List> {
    const userId = req.user ? req.user.userId : '0';
    if (!userId) {
      throw new Error('User ID is missing');
    }
    return this.listService.createDefaultForUser(userId);
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

  // Get liss by user id
  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async getListsByUserId(@Param('userId') userId: string) {
    return this.listService.getListsByUserId(userId);
  }

  // Route pour supprimer une liste
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.listService.delete(id);
  }
}
