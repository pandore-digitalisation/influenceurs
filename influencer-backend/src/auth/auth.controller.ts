import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

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
      // const BASE_URL = "http://localhost:3000";
      const BASE_URL = 'https://influenceurs.onrender.com';

      // Valider et enregistrer l'utilisateur dans la base de données
      const user = await this.authService.validateUser(profile);

      // Générer un token JWT
      const token = await this.authService.generateJwt(user);

      console.log('token', token);

      console.log('user /console controller', user);

      // Rediriger l'utilisateur vers le tableau de bord avec le token en paramètre
      res.redirect(`${BASE_URL}/dashboard?token=${token}`);
    } catch (error) {
      console.error("Erreur lors de l'authentification Google :", error);
      // const BASE_URL = "http://localhost:3000";
      const BASE_URL = 'https://influenceurs.onrender.com';

      // Rediriger vers une page d'erreur ou une page de connexion
      res.redirect(`${BASE_URL}/error`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(@Req() req: Request): Promise<any> {
    try {
      const user = req.user; // Utilisateur extrait par le JwtAuthGuard
      console.log('jwt user', user);
      return {
        status: 'success',
        data: user,
      };
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
      return {
        status: 'error',
        message: "Impossible de récupérer l'utilisateur.",
      };
    }
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt')) // Protégé par JWT
  async logout(@Res() res: Response) {
    await this.authService.logout();

    // Effacer les cookies si utilisés
    res.clearCookie('access_token');

    return res.status(200).json({ message: 'Logout successful' });
  }
}
