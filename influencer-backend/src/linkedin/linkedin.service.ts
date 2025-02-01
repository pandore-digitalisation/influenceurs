import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkedinDto } from './dto/create-linkedin.dto';
import { UpdateLinkedinDto } from './dto/update-linkedin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Linkedin } from './entities/linkedin.entity';
import { Model } from 'mongoose';

@Injectable()
export class LinkedinService {
  constructor(
    @InjectModel(Linkedin.name) private linkedinModel: Model<Linkedin>,
  ) {}
  async create(createLinkedinDto: CreateLinkedinDto): Promise<Linkedin> {
    const { name } = createLinkedinDto;

    const existingLinkedin = await this.linkedinModel.findOne({ name });

    if (existingLinkedin) {
      Object.assign(existingLinkedin, createLinkedinDto);
      return existingLinkedin.save();
    } else {
      const newLinkedin = new this.linkedinModel(createLinkedinDto);
      return newLinkedin.save();
    }
  }

  async createProfile(
    createLinkedinDto: CreateLinkedinDto,
    userId: string | string[],
  ): Promise<Linkedin> {
    const { name } = createLinkedinDto;

    const existingLinkedin = await this.linkedinModel.findOne({ name });

    if (existingLinkedin) {
      const userIdsToAdd = Array.isArray(userId) ? userId : [userId];

      userIdsToAdd.forEach((id) => {
        if (!existingLinkedin.userId.includes(id)) {
          existingLinkedin.userId.push(id);
        }
      });

      Object.assign(existingLinkedin, createLinkedinDto);

      return existingLinkedin.save();
    } else {
      const newLinkedin = new this.linkedinModel({
        ...createLinkedinDto,
        userId: Array.isArray(userId) ? userId : [userId],
      });

      return newLinkedin.save();
    }
  }

  async getProfileByUrl(profileUrl: string): Promise<Linkedin> {
    const profile = await this.linkedinModel.findOne({ profileUrl }).exec();

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    console.log(profile);

    return profile;
  }

  findAll() {
    return this.linkedinModel.find().exec();
  }

  findOne(id: string) {
    return this.linkedinModel.findById(id).exec();
  }

  update(id: string, updateLinkedinDto: UpdateLinkedinDto) {
    return this.linkedinModel.findByIdAndUpdate(id, updateLinkedinDto);
  }

  remove(id: string) {
    return this.linkedinModel.findByIdAndDelete(id).exec();
  }
}
