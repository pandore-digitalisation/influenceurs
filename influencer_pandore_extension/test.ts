// document.getElementById("loginBtn").addEventListener("click", () => {
//     const backendUrl = "https://your-backend-url.com/auth/google";
  
//     // Ouvre la page d'authentification Google
//     chrome.tabs.create({ url: backendUrl }, (tab) => {
//       // Écoute le message envoyé une fois l'authentification réussie
//       chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//         if (message.type === "authSuccess") {
//           const token = message.token;
//           console.log("JWT reçu :", token);
  
//           // Sauvegarde le JWT dans le stockage local de l'extension
//           chrome.storage.local.set({ jwt: token }, () => {
//             console.log("JWT enregistré avec succès.");
//             document.getElementById("status").innerText =
//               "Connexion réussie ! Vous êtes authentifié.";
//           });
  
//           sendResponse({ success: true });
//         }
//       });
//     });
//   });

 // function expandValue(value) {
      //   if (value.endsWith('K')) {
      //     // Supprime 'K' et multiplie par 1 000
      //     return parseFloat(value.replace('K', '')) + " 000";
      //   } else if (value.endsWith('M')) {
      //     // Supprime 'M' et multiplie par 1 000 000
      //     return parseFloat(value.replace('M', '')) + " 000 000";
      //   }
      //   // Retourne la valeur d'origine si aucun suffixe
      //   return parseFloat(value);
      // }

  

//       import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { Response, Request } from 'express';
// import { AuthService } from './auth.service';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Get('google')
//   @UseGuards(AuthGuard('google'))
//   async googleAuth() {
//     // Redirection vers Google pour la connexion
//   }

//   @Get('google/callback')
//   @UseGuards(AuthGuard('google'))
//   async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
//     const user = req.user;
//     const token = await this.authService.generateJwt(user);

//     // Redirection vers le frontend avec le token
//     res.redirect(`http://localhost:3001/dashboard?token=${token}`);
//   }
// }
