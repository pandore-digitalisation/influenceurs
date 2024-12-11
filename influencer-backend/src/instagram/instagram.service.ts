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

  create(createInstagramDto: CreateInstagramDto) {
    const instagram = new this.instagramModel(createInstagramDto);
    return instagram.save();
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
