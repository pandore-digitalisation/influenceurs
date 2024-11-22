import { Controller, Get, Query } from '@nestjs/common';
import { LinkedInService } from './linkedin.service';

@Controller('api/linkedin')
export class LinkedInController {
  constructor(private readonly scraperService: LinkedInService) {}

  @Get('followings')
  async getFollowings(
    @Query('email') email: string,
    @Query('password') password: string,
  ) {
    if (!email || !password) {
      return { error: 'Email and password are required' };
    }

    return await this.scraperService.scrapeFollowings(email, password);
  }
}
