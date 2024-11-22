import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { LinkedinService } from './linkedin.service';

@Controller('linkedin')
export class LinkedinController {
  constructor(private readonly linkedinService: LinkedinService) {}

  @Get('profile')
  async getProfile(
    @Query('email') email: string,
    @Query('password') password: string,
    @Query('profileId') profileId: string,
  ) {
    if (!email || !password || !profileId) {
      throw new BadRequestException('Missing required query parameters');
    }

    try {
      const profile = await this.linkedinService.fetchProfile(
        email,
        password,
        profileId,
      );
      return profile;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
