import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Redirection vers Google pour la connexion
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    const token = await this.authService.generateJwt(user);

    // Redirection vers le frontend avec le token
    res.redirect(`http://localhost:3001/dashboard?token=${token}`);
  }
}

// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
// } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post()
//   create(@Body() createAuthDto: CreateAuthDto) {
//     return this.authService.create(createAuthDto);
//   }

//   @Get('google')
//   findAll() {
//     return this.authService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.authService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
//     return this.authService.update(+id, updateAuthDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.authService.remove(+id);
//   }
// }
