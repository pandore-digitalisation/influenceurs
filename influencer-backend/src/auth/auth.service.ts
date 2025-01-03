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
    console.log('Profil Google brut reçu :', JSON.stringify(profile, null, 2));

    // Tenter d'extraire l'email de plusieurs sources possibles
    const email = profile.email || profile._json?.email || null;

    console.log('Emails disponibles dans le profil :', email);
    console.log('Email extrait du profil :', email);

    if (!email) {
      console.error(
        'Erreur: Aucune adresse email trouvée dans le profil Google.',
      );
      throw new UnauthorizedException('Aucune adresse email trouvée.');
    }

    // Extraire les autres informations nécessaires
    const picture =
      profile.photos?.[0]?.value || profile._json?.picture || null;
    const googleId = profile.id;
    const name =
      profile.displayName ||
      `${profile.name?.givenName || ''} ${profile.name?.familyName || ''}`.trim();

    // Recherche de l'utilisateur par email
    console.log(`Recherche d'un utilisateur avec l'email : ${email}`);
    let user = await this.userModel.findOne({ email });

    if (!user) {
      console.log(
        `Aucun utilisateur trouvé. Création d'un nouvel utilisateur : ${email}`,
      );
      // Création d'un nouvel utilisateur
      user = new this.userModel({
        googleId,
        name,
        email,
        picture,
      });
      await user.save();
    } else {
      console.log(`Utilisateur existant trouvé : ${email}`);
    }

    return user;
  }

  /**
   * Générer un JWT pour un utilisateur authentifié
   * @param user Utilisateur pour lequel générer le JWT
   * @returns Token JWT signé
   */
  async generateJwt(user: User): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    console.log(`JWT généré pour l'utilisateur ${user.email}: ${token}`);
    return token;
  }
}

// import { Injectable } from '@nestjs/common';
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

//   // Valider et enregistrer l'utilisateur
//   async validateUser(profile: any): Promise<User> {
//     console.log('Profil Google reçu:', profile);

//     // Vérifier que les emails existent et qu'ils contiennent des éléments
//     if (!profile.emails || profile.emails.length === 0) {
//       throw new Error('Aucune adresse email trouvée dans le profil Google.');
//     }

//     const email = profile.emails[0].value;
//     const picture = profile.photos?.[0]?.value || null;

//     let user = await this.userModel.findOne({ email });

//     if (!user) {
//       user = new this.userModel({
//         googleId: profile.id,
//         name: profile.displayName,
//         email,
//         picture,
//       });
//       await user.save();
//     }

//     return user;
//   }

//   // Générer un JWT pour l'utilisateur
//   async generateJwt(user: User): Promise<string> {
//     const payload = { sub: user.id, email: user.email };
//     return this.jwtService.sign(payload);
//   }
// }

// import { Injectable } from '@nestjs/common';
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

//   async validateUser(profile: any): Promise<any> {
//     console.log('Profil Google reçu:', profile);

//     const { id, displayName, emails, photos } = profile;
//     // Ici, enregistrer ou mettre à jour l'utilisateur dans la base de données
//     const user = {
//       googleId: id,
//       name: displayName,
//       email: emails[0].value,
//       picture: photos[0].value,
//     };
//     // Vérifier si l'utilisateur existe déjà dans la base de données
//     let userInfo = await this.userModel.findOne({ email: user.email });

//     if (!userInfo) {
//       userInfo = new this.userModel({
//         googleId: id,
//         name: displayName,
//         email: emails[0].value,
//         picture: photos[0].value,
//       });
//       await userInfo.save();
//     } else {
//       userInfo.name = displayName;
//       userInfo.picture = photos[0].value;
//       await userInfo.save();
//     }

//     return userInfo;
//   }

//   async generateJwt(user: any): Promise<string> {
//     const payload = { sub: user.id, email: user.email };
//     return this.jwtService.sign(payload);
//   }
// }
