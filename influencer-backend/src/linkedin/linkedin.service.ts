import { Injectable } from '@nestjs/common';
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
