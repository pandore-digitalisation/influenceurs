import { Injectable } from '@nestjs/common';
import { CreateInstagramDto } from './dto/create-instagram.dto';
import { UpdateInstagramDto } from './dto/update-instagram.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Instagram } from './entities/instagram.entity';
import { Model } from 'mongoose';

@Injectable()
export class InstagramService {
  constructor(
    @InjectModel(Instagram.name) private instagramModel: Model<Instagram>,
  ) {}
  async create(createInstagramDto: CreateInstagramDto): Promise<Instagram> {
    const { name } = createInstagramDto;

    const existingInstagram = await this.instagramModel.findOne({ name });

    if (existingInstagram) {
      Object.assign(existingInstagram, createInstagramDto);
      return existingInstagram.save();
    } else {
      const newInstagram = new this.instagramModel(createInstagramDto);
      return newInstagram.save();
    }
  }

  findAll() {
    return this.instagramModel.find().exec();
  }

  findOne(id: number) {
    return this.instagramModel.findById(id).exec();
  }

  update(id: number, updateInstagramDto: UpdateInstagramDto) {
    return this.instagramModel.findByIdAndUpdate(id, updateInstagramDto);
  }

  remove(id: number) {
    return this.instagramModel.findByIdAndDelete(id).exec();
  }
}
