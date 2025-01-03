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

  /**
   * Valider et enregistrer l'utilisateur à partir du profil Google
   * @param profile Profil Google reçu
   * @returns Utilisateur validé ou nouvel utilisateur créé
   */
  async validateUser(profile: any): Promise<User> {
    // Extraction des informations de l'utilisateur depuis le profil Google
    const email = profile.email || profile._json?.email;
    const picture = profile.photos?.[0]?.value || profile._json?.picture;
    const googleId = profile.id;
    const name =
      profile.displayName ||
      `${profile.name?.givenName || ''} ${profile.name?.familyName || ''}`.trim();
    const firstName = profile.name?.givenName || '';
    const lastName = profile.name?.familyName || '';

    // Vérification si l'email est présent dans le profil Google
    if (!email) {
      console.error('Aucune adresse email trouvée dans le profil Google.');
      throw new UnauthorizedException('Aucune adresse email trouvée.');
    }

    // Log des informations récupérées
    console.log(
      `Données utilisateur extraites : ${email}, ${name}, ${firstName}, ${lastName}, ${picture}`,
    );

    // Recherche de l'utilisateur dans la base de données par email
    let user = await this.userModel.findOne({ email });

    if (!user) {
      console.log(
        `Aucun utilisateur trouvé, création d'un nouvel utilisateur...`,
      );

      // Création d'un nouvel utilisateur avec toutes les données disponibles
      user = new this.userModel({
        googleId,
        name,
        firstName,
        lastName,
        email,
        picture,
      });

      // Sauvegarde du nouvel utilisateur dans la base de données
      await user.save();
    } else {
      console.log(`Utilisateur existant trouvé : ${email}`);
    }

    // Retourner l'utilisateur trouvé ou créé
    return user;
  }

  /**
   * Générer un JWT pour un utilisateur
   * @param user Utilisateur pour lequel générer le JWT
   * @returns Le token JWT
   */
  async generateJwt(user: User): Promise<string> {
    // Création du payload pour le JWT
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.name,
      picture: user.picture,
    };

    // Génération du JWT avec le payload
    const token = this.jwtService.sign(payload);
    console.log(`JWT généré pour l'utilisateur ${user.email}: ${token}`);

    // Retourner le token généré
    return token;
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

//   /**
//    * Valider et enregistrer l'utilisateur à partir du profil Google
//    * @param profile Profil Google reçu
//    * @returns Utilisateur validé ou nouvel utilisateur créé
//    */
//   async validateUser(profile: any): Promise<User> {
//     // console.log('Profil Google brut reçu :', JSON.stringify(profile, null, 2));

//     // Tenter d'extraire l'email de plusieurs sources possibles
//     const email = profile.email || profile._json?.email || null;

//     // console.log('Emails disponibles dans le profil :', email);
//     // console.log('Email extrait du profil :', email);
//     // console.log('name extrait du profil :', profile.name);

//     if (!email) {
//       console.error(
//         'Erreur: Aucune adresse email trouvée dans le profil Google.',
//       );
//       throw new UnauthorizedException('Aucune adresse email trouvée.');
//     }

//     // Extraire les autres informations nécessaires
//     const picture =
//       profile.photos?.[0]?.value || profile._json?.picture || null;
//     const googleId = profile.id;
//     const name =
//       profile.displayName ||
//       `${profile.name?.givenName || ''} ${profile.name?.familyName || ''}`.trim();

//     // Recherche de l'utilisateur par email
//     console.log(`Recherche d'un utilisateur avec l'email : ${email}`);
//     let user = await this.userModel.findOne({ email });

//     if (!user) {
//       console.log(
//         `Aucun utilisateur trouvé. Création d'un nouvel utilisateur : ${email}`,
//       );
//       // Création d'un nouvel utilisateur
//       user = new this.userModel({
//         googleId,
//         name,
//         email,
//         picture,
//       });
//       await user.save();
//     } else {
//       console.log(`Utilisateur existant trouvé : ${email}`);
//     }

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

//   // async getUserById(userId: string): Promise<User | null> {
//   //   const user = await this.userModel.findById(userId).exec();
//   //   if (!user) {
//   //     throw new UnauthorizedException('Utilisateur non trouvé.');
//   //   }
//   //   return user;
//   // }
// }
