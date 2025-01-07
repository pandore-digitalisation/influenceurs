// async getListsByUserId(userId: string): Promise<List[]> {
//     return this.listModel.find({ userId }).exec();
//   }

// @Get('user-lists')
// async getUserLists(@Req() req: Request): Promise<List[]> {
//   const userId = req.user.id; // Assurez-vous que le middleware de validation JWT attache l'utilisateur au `req`.
//   return this.listService.getListsByUserId(userId);
// }