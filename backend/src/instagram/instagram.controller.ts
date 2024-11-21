// src/instagram/instagram.controller.ts

import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InstagramService } from './instagram.service';

@Controller('api/instagram')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}

  // Endpoint pour récupérer les followings d'un utilisateur
  @Get('followings')
  async getFollowings(
    @Query('username') username: string,
    @Query('password') password: string,
  ): Promise<string[]> {
    if (!username || !password) {
      throw new HttpException(
        'Username and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.instagramService.getFollowings(username, password);
  }
}

// import { Controller, Get, Query } from '@nestjs/common';
// import { InstagramService } from './instagram.service';

// @Controller('api/instagram')
// export class InstagramController {
//   constructor(private readonly instagramService: InstagramService) {}

//   @Get('followed-pages')
//   async getFollowedPagesDetails(
//     @Query('username') username: string,
//     @Query('password') password: string,
//   ) {
//     try {
//       const details = await this.instagramService.getFollowedPagesDetails(
//         username,
//         password,
//       );
//       return { followedPagesDetails: details };
//     } catch (error) {
//       return {
//         message: 'Error retrieving profile details',
//         error: error.message,
//       };
//     }
//   }
// }

// import { Controller, Get, Query } from '@nestjs/common';
// import { InstagramService } from './instagram.service';

// @Controller('api/instagram')
// export class InstagramController {
//   constructor(private readonly instagramService: InstagramService) {}

//   // Endpoint pour récupérer les pages publiques suivies par l'utilisateur via Puppeteer
//   @Get('followed-pages')
//   async getFollowedPages(
//     @Query('username') username: string,
//     @Query('password') password: string,
//   ) {
//     try {
//       const followedPages = await this.instagramService.getFollowedPages(
//         username,
//         password,
//       );
//       return { followedPages };
//     } catch (error) {
//       return {
//         message: 'Error retrieving followed pages',
//         error: error.message,
//       };
//     }
//   }

//   // Endpoint pour récupérer les pages publiques via l'API
//   @Get('public-pages')
//   async getPublicPages() {
//     try {
//       const publicPages = await this.instagramService.getPublicPages();
//       return { publicPages };
//     } catch (error) {
//       return { message: 'Error retrieving public pages', error: error.message };
//     }
//   }
// }
