import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import fetch from 'node-fetch';

@Controller('proxy')
export class ImageProxyController {
  @Get()
  async proxyImage(@Query('url') url: string, @Res() res: Response) {
    if (!url) {
      return res.status(400).send('Image URL is required');
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        return res.status(500).send('Failed to fetch image');
      }

      const contentType = response.headers.get('content-type');
      res.setHeader('Content-Type', contentType);
      res.setHeader('Access-Control-Allow-Origin', '*');

      const buffer = await response.buffer();
      res.send(buffer);
    } catch (error) {
      res.status(500).send(`Failed to fetch image: ${error}`);
    }
  }
}
