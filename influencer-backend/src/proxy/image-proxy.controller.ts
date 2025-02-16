import {
  Controller,
  Get,
  Query,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import fetch from 'node-fetch';

@Controller('proxy')
export class ImageProxyController {
  @Get()
  async proxyImage(@Query('url') url: string, @Res() res: Response) {
    if (!url || !this.isValidUrl(url)) {
      throw new BadRequestException('Image URL is required and must be valid');
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        return res.status(response.status).send('Failed to fetch image');
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.startsWith('image')) {
        return res.status(400).send('URL does not point to an image');
      }

      // Mise en cache pour 1 jour (86400 secondes)
      res.setHeader('Content-Type', contentType);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 'public, max-age=86400, immutable');

      const buffer = await response.buffer();
      res.send(buffer);
    } catch (error) {
      res.status(500).send(`Failed to fetch image: ${error.message}`);
    }
  }

  // Vérifier si l'URL est valide
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}
