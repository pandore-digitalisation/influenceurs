import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createProfile(
    createFacebookDto: CreateFacebookDto,
    userId: string | string[],
  ): Promise<Facebook> {
    const { name } = createFacebookDto;

    const existingFacebook = await this.facebookModel.findOne({ name });

    if (existingFacebook) {
      const userIdsToAdd = Array.isArray(userId) ? userId : [userId];

      userIdsToAdd.forEach((id) => {
        if (!existingFacebook.userId.includes(id)) {
          existingFacebook.userId.push(id);
        }
      });
      Object.assign(existingFacebook, createFacebookDto);
      return existingFacebook.save();
    } else {
      const newFacebook = new this.facebookModel({
        ...createFacebookDto,
        userId: Array.isArray(userId) ? userId : [userId],
      });
      return newFacebook.save();
    }
  }

  async getProfileByUrl(profileUrl: string): Promise<Facebook> {
    const profile = await this.facebookModel.findOne({ profileUrl }).exec();

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    console.log(profile);

    return profile;
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
