import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Démarre le processus d'authentification avec Google
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<void> {}

  // Callback après l'authentification réussie avec Google
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const profile = req.user;

      // Valider et enregistrer l'utilisateur dans la base de données
      const user = await this.authService.validateUser(profile);

      // Générer un token JWT
      const token = await this.authService.generateJwt(user);

      console.log('token', token);

      // Rediriger l'utilisateur vers le tableau de bord avec le token en paramètre
      res.redirect(`http://localhost:3001/dashboard?token=${token}`);
    } catch (error) {
      console.error("Erreur lors de l'authentification Google :", error);

      // Rediriger vers une page d'erreur ou une page de connexion
      res.redirect('http://localhost:3001/error');
    }
  }
}

// import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { Response, Request } from 'express';
// import { AuthService } from './auth.service';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Get('google')
//   @UseGuards(AuthGuard('google'))
//   async googleAuth() {}

//   @Get('google/callback')
//   @UseGuards(AuthGuard('google'))
//   async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
//     const user = req.user;
//     const token = await this.authService.generateJwt(user);
//     console.log('user : ', user);

//     res.redirect(`http://localhost:3001/dashboard?token=${token}`);
//   }
// }
