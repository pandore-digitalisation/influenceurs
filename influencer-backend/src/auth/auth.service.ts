import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async validateUser(profile: any): Promise<User> {
    try {
      const email = profile.email || profile._json?.email;
      const googleId = profile.id;
      const name =
        profile.displayName ||
        `${profile.name?.givenName || ''} ${profile.name?.familyName || ''}`.trim();
      const picture = profile.photos?.[0]?.value;

      if (!email) {
        console.error('Aucune adresse email trouvée dans le profil Google.');
        throw new UnauthorizedException('Aucune adresse email trouvée.');
      }

      console.log(
        `Données utilisateur extraites : email=${email}, name=${name}, picture=${picture}`,
      );

      let user = await this.userModel.findOne({ email });

      if (!user) {
        console.log(
          'Aucun utilisateur trouvé, création d’un nouvel utilisateur...',
        );
        user = new this.userModel({
          googleId,
          name,
          email,
          picture,
        });
        await user.save();
        console.log('Nouvel utilisateur créé avec succès.');
      } else {
        console.log(
          'Utilisateur existant trouvé, vérification des mises à jour...',
        );

        // Met à jour uniquement si les données changent
        const updates: Partial<User> = {};
        if (user.name !== name && name) {
          updates.name = name;
        }
        if (user.picture !== picture && picture) {
          updates.picture = picture;
        }

        if (Object.keys(updates).length > 0) {
          Object.assign(user, updates);
          await user.save();
          console.log('Utilisateur mis à jour avec succès.');
        }
      }

      console.log('Utilisateur final prêt :', user);
      return user;
    } catch (error) {
      console.error('Erreur lors de la validation de l’utilisateur :', error);
      throw new UnauthorizedException(
        'Erreur lors de la validation de l’utilisateur.',
      );
    }
  }

  async generateJwt(user: User): Promise<string> {
    try {
      const payload = {
        sub: user.id,
        email: user.email,
        username: user.name || 'Nom inconnu',
        picture: user.picture || '',
      };

      const token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY,
      });
      console.log(`JWT généré pour l’utilisateur ${user.email}: ${token}`);
      return token;
    } catch (error) {
      console.error('Erreur lors de la génération du JWT :', error);
      throw new UnauthorizedException('Erreur lors de la génération du token.');
    }
  }

  async logout(): Promise<{ message: string }> {
    return { message: 'Déconnexion réussie' };
  }
}

// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User } from './entities/auth.entity';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly jwtService: JwtService,
//     @InjectModel(User.name) private readonly userModel: Model<User>,
//   ) {}

//   async validateUser(profile: any): Promise<User> {
//     // Extraction des informations de l'utilisateur depuis le profil Google
//     const email = profile.email || profile._json?.email;
//     const picture = profile.photos?.[0]?.value;
//     const googleId = profile.id;
//     const name =
//       profile.displayName ||
//       `${profile.name?.givenName || ''} ${profile.name?.familyName || ''}`.trim();

//     // Vérification si l'email est présent dans le profil Google
//     if (!email) {
//       console.error('Aucune adresse email trouvée dans le profil Google.');
//       throw new UnauthorizedException('Aucune adresse email trouvée.');
//     } else {
//       console.log(
//         `Données utilisateur extraites : ${email}, ${name}, ${picture}`,
//       );
//     }

//     // Recherche de l'utilisateur dans la base de données par email
//     let user = await this.userModel.findOne({ email });

//     if (!user) {
//       console.log(
//         `Aucun utilisateur trouvé, création d'un nouvel utilisateur...`,
//       );

//       // Création d'un nouvel utilisateur avec toutes les données disponibles
//       user = new this.userModel({
//         googleId,
//         name,
//         email,
//         picture,
//       });

//       // Sauvegarde du nouvel utilisateur dans la base de données
//       await user.save();
//     } else {
//       console.log(`Utilisateur existant trouvé : ${email}`);
//     }

//     // Retourner l'utilisateur trouvé ou créé
//     return user;
//   }

//   async generateJwt(user: User): Promise<string> {
//     const payload = {
//       sub: user.id,
//       email: user.email,
//       username: user.name,
//       picture: user.picture,
//     };

//     const token = this.jwtService.sign(payload);
//     console.log(`JWT généré pour l'utilisateur ${user.email}: ${token}`);

//     return token;
//   }

//   async logout(): Promise<{ message: string }> {
//     return { message: 'Logout successful' };
//   }
// }
