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

    // Vérifier si le profil existe déjà
    const existingLinkedin = await this.linkedinModel.findOne({ name });

    if (existingLinkedin) {
      // Convertir userId en tableau s'il ne l'est pas
      const userIdsToAdd = Array.isArray(userId) ? userId : [userId];

      // Ajouter uniquement les userId qui ne sont pas déjà présents
      userIdsToAdd.forEach((id) => {
        if (!existingLinkedin.userId.includes(id)) {
          existingLinkedin.userId.push(id);
        }
      });

      // Mettre à jour les autres champs
      Object.assign(existingLinkedin, createLinkedinDto);

      // Enregistrer et retourner le profil mis à jour
      return existingLinkedin.save();
    } else {
      // Créer un nouveau profil si inexistant
      const newLinkedin = new this.linkedinModel({
        ...createLinkedinDto,
        userId: Array.isArray(userId) ? userId : [userId],
      });

      // Enregistrer et retourner le nouveau profil
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
