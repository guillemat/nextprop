import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Leer el JSON de los headers (si existe)
    const receivedJson = request.headers.get('X-Received-JSON');
    
   // console.log('receivedJson', receivedJson);
    

  if (receivedJson) {
    response.cookies.set('jsonrecibido', receivedJson, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: '/',
    });
  }

  return response;
}

export const config = {
  matcher: ['/info', '/api/:path*'], // Middleware en estas rutas
};
