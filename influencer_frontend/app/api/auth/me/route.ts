// app/api/auth/me/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('auth_token'); // Récupérer le cookie 'auth_token'

  // Si pas de token, retourner une erreur
  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  // Si token existe, renvoyer le token
  return NextResponse.json({ token });
}
