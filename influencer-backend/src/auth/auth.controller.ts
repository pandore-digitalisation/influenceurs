import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  BASE_URL = 'http://localhost:3001';
  // BASE_URL = 'https://pandoreinfluencerfrontend.vercel.app';

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<void> {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const profile = req.user;

      const user = await this.authService.validateUser(profile);

      const token = await this.authService.generateJwt(user);

      console.log('token', token);

      console.log('user /console controller', user);

      // res.cookie('auth_token', token, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production',
      //   sameSite: 'strict',
      // });

      res.cookie('auth_token', token, {
        httpOnly: false,
        secure: false,
        sameSite: 'none',
        domain: '.pandoreinfluencerfrontend.vercel.app',
      });

      res.redirect(`${this.BASE_URL}/dashboard`);
    } catch (error) {
      console.error("Erreur lors de l'authentification Google :", error);
      res.redirect(`${this.BASE_URL}/error`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(@Req() req: Request): Promise<any> {
    try {
      const user = req.user;
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

  @Get('status')
  @UseGuards(AuthGuard('jwt'))
  async getAuthStatus(@Req() req: Request, @Res() res: Response) {
    if (req.user) {
      return res.status(200).json({ authenticated: true, user: req.user });
    }
    return res.status(401).json({ authentificated: false });
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Res() res: Response) {
    await this.authService.logout();
    res.clearCookie('auth_token');
    return res.status(200).json({ message: 'Logout successful' });
  }
}

// import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { Response, Request } from 'express';
// import { AuthService } from './auth.service';
// import { JwtAuthGuard } from './jwt-auth.guard';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   BASE_URL = 'http://localhost:3001';
//   // BASE_URL = 'https://pandoreinfluencerfrontend.vercel.app';

//   @Get('google')
//   @UseGuards(AuthGuard('google'))
//   async googleAuth(): Promise<void> {}

//   @Get('google/callback')
//   @UseGuards(AuthGuard('google'))
//   async googleAuthCallback(
//     @Req() req: Request,
//     @Res() res: Response,
//   ): Promise<void> {
//     try {
//       const profile = req.user;

//       // Valider et enregistrer l'utilisateur dans la base de données
//       const user = await this.authService.validateUser(profile);

//       // Générer un token JWT
//       const token = await this.authService.generateJwt(user);

//       console.log('token', token);

//       console.log('user /console controller', user);

//       res.cookie('auth_token', token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict',
//       });

//       res.redirect(`${this.BASE_URL}/dashboard`);
//     } catch (error) {
//       console.error("Erreur lors de l'authentification Google :", error);

//       res.redirect(`${this.BASE_URL}/error`);
//     }
//   }

//   @UseGuards(JwtAuthGuard)
//   @Get('user')
//   async getUser(@Req() req: Request): Promise<any> {
//     try {
//       const user = req.user;
//       console.log('jwt user', user);
//       return {
//         status: 'success',
//         data: user,
//       };
//     } catch (error) {
//       console.error("Erreur lors de la récupération de l'utilisateur :", error);
//       return {
//         status: 'error',
//         message: "Impossible de récupérer l'utilisateur.",
//       };
//     }
//   }

//   @Get('status')
//   @UseGuards(AuthGuard('jwt'))
//   async getAuthStatus(@Req() req: Request, @Res() res: Response) {
//     if (req.user) {
//       return res.status(200).json({ authenticated: true, user: req.user });
//     }
//     return res.status(401).json({ authentificated: false });
//   }

//   @Post('logout')
//   @UseGuards(AuthGuard('jwt'))
//   async logout(@Res() res: Response) {
//     await this.authService.logout();

//     res.clearCookie('auth_token');

//     return res.status(200).json({ message: 'Logout successful' });
//   }
// }
