import { Injectable } from '@nestjs/common';
import { CreateTiktokDto } from './dto/create-tiktok.dto';
import { UpdateTiktokDto } from './dto/update-tiktok.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tiktok } from './entities/tiktok.entity';
import { Model } from 'mongoose';

@Injectable()
export class TiktokService {
  constructor(@InjectModel(Tiktok.name) private tiktokModel: Model<Tiktok>) {}
  async create(createTiktokDto: CreateTiktokDto): Promise<Tiktok> {
    const { name } = createTiktokDto;

    const existingTiktok = await this.tiktokModel.findOne({ name });

    if (existingTiktok) {
      Object.assign(existingTiktok, createTiktokDto);
      return existingTiktok.save();
    } else {
      const newTiktok = new this.tiktokModel(createTiktokDto);
      return newTiktok.save();
    }
  }

  findAll() {
    return this.tiktokModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} tiktok`;
  }

  update(id: string, updateTiktokDto: UpdateTiktokDto) {
    return this.tiktokModel.findByIdAndUpdate(id, updateTiktokDto);
  }

  remove(id: number) {
    return `This action removes a #${id} tiktok`;
  }
}
