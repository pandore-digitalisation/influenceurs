import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createProfile(
    createTiktokDto: CreateTiktokDto,
    userId: string | string[],
  ): Promise<Tiktok> {
    const { name } = createTiktokDto;

    // Vérifier si le profil existe déjà
    const existingTiktok = await this.tiktokModel.findOne({ name });

    if (existingTiktok) {
      // Convertir userId en tableau s'il ne l'est pas
      const userIdsToAdd = Array.isArray(userId) ? userId : [userId];

      // Ajouter uniquement les userId qui ne sont pas déjà présents
      userIdsToAdd.forEach((id) => {
        if (!existingTiktok.userId.includes(id)) {
          existingTiktok.userId.push(id);
        }
      });

      // Mettre à jour les autres champs
      Object.assign(existingTiktok, createTiktokDto);

      // Enregistrer et retourner le profil mis à jour
      return existingTiktok.save();
    } else {
      // Créer un nouveau profil si inexistant
      const newTiktok = new this.tiktokModel({
        ...createTiktokDto,
        userId: Array.isArray(userId) ? userId : [userId],
      });

      // Enregistrer et retourner le nouveau profil
      return newTiktok.save();
    }
  }

  async getProfileByUrl(profileUrl: string): Promise<Tiktok> {
    const profile = await this.tiktokModel.findOne({ profileUrl }).exec();

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    console.log(profile);

    return profile;
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

// import { Injectable } from '@nestjs/common';
// import { CreateTiktokDto } from './dto/create-tiktok.dto';
// import { UpdateTiktokDto } from './dto/update-tiktok.dto';
// import { InjectModel } from '@nestjs/mongoose';
// import { Tiktok } from './entities/tiktok.entity';
// import { Model } from 'mongoose';

// @Injectable()
// export class TiktokService {
//   constructor(@InjectModel(Tiktok.name) private tiktokModel: Model<Tiktok>) {}
//   async create(createTiktokDto: CreateTiktokDto): Promise<Tiktok> {
//     const { name } = createTiktokDto;

//     const existingTiktok = await this.tiktokModel.findOne({ name });

//     if (existingTiktok) {
//       Object.assign(existingTiktok, createTiktokDto);
//       return existingTiktok.save();
//     } else {
//       const newTiktok = new this.tiktokModel(createTiktokDto);
//       return newTiktok.save();
//     }
//   }

//   findAll() {
//     return this.tiktokModel.find().exec();
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} tiktok`;
//   }

//   update(id: string, updateTiktokDto: UpdateTiktokDto) {
//     return this.tiktokModel.findByIdAndUpdate(id, updateTiktokDto);
//   }

//   remove(id: number) {
//     return `This action removes a #${id} tiktok`;
//   }
// }
