// src/auth/request.interface.ts
import { Request } from 'express';

export interface CustomRequest extends Request {
  user?: { userId: string; email: string; name: string; picture: string };
}
