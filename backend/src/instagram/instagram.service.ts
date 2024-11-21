import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class InstagramService {
  private readonly BASE_URL = process.env.INSTAGRAM_API_BASE_URL;
  private readonly ACCESS_TOKEN = process.env.ACCESS_TOKEN;

  constructor(private readonly httpService: HttpService) {}

  async getPublicPages(): Promise<any> {
    try {
      const endpoint = `${this.BASE_URL}/me/accounts`;
      const response$ = this.httpService.get(endpoint, {
        params: {
          access_token: this.ACCESS_TOKEN,
        },
      });
      const { data } = await lastValueFrom(response$);

      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Unable to fetch public pages',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
