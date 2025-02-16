import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { List } from './entities/list.entity';
import { CreateListDto } from './dto/create-list.dto';

@Injectable()
export class ListService {
  constructor(
    @InjectModel(List.name) private readonly listModel: Model<List>,
  ) {}

  async findAll(): Promise<List[]> {
    return this.listModel.find().exec();
  }

  async findOne(id: string): Promise<List> {
    const list = await this.listModel.findById(id).exec();
    if (!list) {
      throw new NotFoundException(`List with ID "${id}" not found`);
    }
    return list;
  }

  async create(userId: string, createListDto: CreateListDto): Promise<List> {
    const newList = new this.listModel(createListDto, userId);
    return newList.save();
  }

  async createDefaultForUser(userId: string): Promise<List> {
    const existingDefaultList = await this.listModel
      .findOne({ userId, name: 'Default List' })
      .exec();

    if (existingDefaultList) {
      return existingDefaultList;
    }

    const defaultListData = {
      name: 'Default List',
      profiles: [],
      userId,
    };

    const newList = new this.listModel(defaultListData);
    return newList.save();
  }

  async update(
    id: string,
    data: { name?: string; profiles?: { add?: string[]; remove?: string[] } },
  ): Promise<List> {
    const list = await this.listModel.findById(id).exec();
    if (!list) {
      throw new NotFoundException(`List with ID "${id}" not found`);
    }

    if (data.name) {
      list.name = data.name;
    }

    if (data.profiles?.add) {
      list.profiles = [...new Set([...list.profiles, ...data.profiles.add])];
    }

    if (data.profiles?.remove) {
      list.profiles = list.profiles.filter(
        (profile) => !data.profiles.remove.includes(profile),
      );
    }

    return list.save();
  }

  async getListsByUserId(userId: string): Promise<List[]> {
    return this.listModel.find({ userId }).exec();
  }

  async delete(id: string): Promise<void> {
    const result = await this.listModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`List with ID "${id}" not found`);
    }
  }
}
