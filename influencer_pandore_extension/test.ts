//   // Déconnexion de l'utilisateur
//   @Post('logout')
//   @UseGuards(AuthGuard('jwt')) // Protégé par JWT
//   async logout(@Res() res: Response): Promise<any> {
//     try {
//       await this.authService.logout();

//       // Effacer les cookies si utilisés
//       res.clearCookie('access_token');

//       return res.status(200).json({ message: 'Déconnexion réussie' });
//     } catch (error) {
//       console.error('Erreur lors de la déconnexion :', error);
//       return res.status(500).json({ message: 'Erreur lors de la déconnexion.' });
//     }
//   }
// }