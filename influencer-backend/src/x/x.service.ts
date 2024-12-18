import { Injectable } from '@nestjs/common';
import { CreateXDto } from './dto/create-x.dto';
import { UpdateXDto } from './dto/update-x.dto';
import { InjectModel } from '@nestjs/mongoose';
import { X } from './entities/x.entity';
import { Model } from 'mongoose';

@Injectable()
export class XService {
  constructor(@InjectModel(X.name) private xModel: Model<X>) {}
  async create(createXDto: CreateXDto): Promise<X> {
    const { name } = createXDto;

    const existingX = await this.xModel.findOne({ name });

    if (existingX) {
      Object.assign(existingX, createXDto);
      return existingX.save();
    } else {
      const newX = new this.xModel(createXDto);
      return newX.save();
    }
  }
  async findAll() {
    return this.xModel.find().exec();
  }

  async findOne(id: string): Promise<X> {
    return this.xModel.findById(id).exec();
  }

  update(id: number, updateXDto: UpdateXDto) {
    return this.xModel.findByIdAndUpdate(id, updateXDto);
  }
  remove(id: string) {
    return this.xModel.findByIdAndDelete(id).exec();
  }
}
