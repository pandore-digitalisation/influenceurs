import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { List } from './entities/list.entity';

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

  async create(data: { name: string }): Promise<List> {
    const newList = new this.listModel(data);
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

    // Mise à jour du nom si fourni
    if (data.name) {
      list.name = data.name;
    }

    // Ajout des profils
    if (data.profiles?.add) {
      list.profiles = [...new Set([...list.profiles, ...data.profiles.add])];
    }

    // Suppression des profils
    if (data.profiles?.remove) {
      list.profiles = list.profiles.filter(
        (profile) => !data.profiles.remove.includes(profile),
      );
    }

    // Sauvegarde des modifications
    return list.save();
  }

  async delete(id: string): Promise<void> {
    const result = await this.listModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`List with ID "${id}" not found`);
    }
  }
}

// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { List } from './entities/list.entity';

// @Injectable()
// export class ListService {
//   constructor(
//     @InjectModel(List.name) private readonly listModel: Model<List>,
//   ) {}

//   async findAll(): Promise<List[]> {
//     return this.listModel.find().exec();
//   }

//   async findOne(id: string): Promise<List> {
//     const list = await this.listModel.findById(id).exec();
//     if (!list) {
//       throw new NotFoundException(`List with ID "${id}" not found`);
//     }
//     return list;
//   }

//   async create(data: { name: string }): Promise<List> {
//     const newList = new this.listModel(data);
//     return newList.save();
//   }

//   async update(
//     id: string,
//     data: { name?: string; profiles?: string[] },
//   ): Promise<List> {
//     const updatedList = await this.listModel
//       .findByIdAndUpdate(id, data, { new: true })
//       .exec();
//     if (!updatedList) {
//       throw new NotFoundException(`List with ID "${id}" not found`);
//     }
//     return updatedList;
//   }

//   async delete(id: string): Promise<void> {
//     const result = await this.listModel.findByIdAndDelete(id).exec();
//     if (!result) {
//       throw new NotFoundException(`List with ID "${id}" not found`);
//     }
//   }
// }
