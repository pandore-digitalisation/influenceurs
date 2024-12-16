import { Injectable } from '@nestjs/common';
import { CreateFacebookDto } from './dto/create-facebook.dto';
import { UpdateFacebookDto } from './dto/update-facebook.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Facebook } from './entities/facebook.entity';
import { Model } from 'mongoose';

@Injectable()
export class FacebookService {
  constructor(
    @InjectModel(Facebook.name) private facebookModel: Model<Facebook>,
  ) {}
  async create(createFacebookDto: CreateFacebookDto): Promise<Facebook> {
    const { name } = createFacebookDto;

    const existingFacebook = await this.facebookModel.findOne({ name });

    if (existingFacebook) {
      Object.assign(existingFacebook, createFacebookDto);
      return existingFacebook.save();
    } else {
      const newFacebook = new this.facebookModel(createFacebookDto);
      return newFacebook.save();
    }
  }

  findAll() {
    return this.facebookModel.find().exec();
  }

  findOne(id: number) {
    return this.facebookModel.findById(id).exec();
  }

  update(id: number, updateFacebookDto: UpdateFacebookDto) {
    return this.facebookModel.findByIdAndUpdate(id, updateFacebookDto);
  }

  remove(id: number) {
    return this.facebookModel.findByIdAndDelete(id).exec();
  }
}
