import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(profile: any): Promise<any> {
    const { id, displayName, emails } = profile;
    // Ici, enregistrer ou mettre à jour l'utilisateur dans la base de données
    const user = {
      id,
      name: displayName,
      email: emails[0].value,
    };
    return user;
  }

  async generateJwt(user: any): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}

// import { Injectable } from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';

// @Injectable()
// export class AuthService {
//   create(createAuthDto: CreateAuthDto) {
//     return 'This action adds a new auth';
//   }

//   findAll() {
//     return `This action returns all auth`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} auth`;
//   }

//   update(id: number, updateAuthDto: UpdateAuthDto) {
//     return `This action updates a #${id} auth`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} auth`;
//   }
// }
