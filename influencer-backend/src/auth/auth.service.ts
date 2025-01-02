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
