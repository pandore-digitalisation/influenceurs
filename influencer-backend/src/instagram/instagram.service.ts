import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createProfile(
    createInstagramDto: CreateInstagramDto,
    userId: string | string[],
  ): Promise<Instagram> {
    const { name } = createInstagramDto;

    // Vérifier si le profil existe déjà
    const existingInstagram = await this.instagramModel.findOne({ name });

    if (existingInstagram) {
      // Convertir userId en tableau s'il ne l'est pas
      const userIdsToAdd = Array.isArray(userId) ? userId : [userId];

      // Ajouter uniquement les userId qui ne sont pas déjà présents
      userIdsToAdd.forEach((id) => {
        if (!existingInstagram.userId.includes(id)) {
          existingInstagram.userId.push(id);
        }
      });

      // Mettre à jour les autres champs
      Object.assign(existingInstagram, CreateInstagramDto);

      // Enregistrer et retourner le profil mis à jour
      return existingInstagram.save();
    } else {
      // Créer un nouveau profil si inexistant
      const newInstagram = new this.instagramModel({
        ...createInstagramDto,
        userId: Array.isArray(userId) ? userId : [userId],
      });

      // Enregistrer et retourner le nouveau profil
      return newInstagram.save();
    }
  }

  async getProfileByUrl(profileUrl: string): Promise<Instagram> {
    const profile = await this.instagramModel.findOne({ profileUrl }).exec();

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
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
