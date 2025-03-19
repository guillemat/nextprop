import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

type RequestBody = {
  _id: string;
  topic: string;
  resource: string;
  user_id: number;
  application_id: number;
  sent: string;
  attemps: number;
  received: string;
  actions: string[];  
};

export async function POST(request: NextRequest) {
  try {
    // Parseamos el cuerpo de la solicitud como JSON
    const body: RequestBody = await request.json();
      
    // Convertir el JSON a una cadena (las cookies solo almacenan strings)
    const jsonString = JSON.stringify(body);
      
    // Establecer la cookie
    (await cookies()).set('jsonrecibido', jsonString, {
        //httpOnly: false, // La cookie solo es accesible desde el servidor
        //secure: process.env.NODE_ENV === 'production', // Solo enviar en HTTPS en producción
        maxAge: 60 * 60 * 24 * 7, // Caduca en 7 días
        path: '/', // La cookie estará disponible en toda la aplicación
    });
      
    // Respondemos con un mensaje de éxito
    return NextResponse.json(
      { message: 'JSON recibido correctamente', data: body },
      { status: 200 }
    );
  } catch (error) {
    // Si hay un error, respondemos con un código de estado 500
    return NextResponse.json(
      { message: 'Error al procesar el JSON', error: error.message },
      { status: 500 }
    );
  }
}



// Nueva API para obtener la cookie
export async function GET() {
  const cookieStore = cookies();
  const jsonData = cookieStore.get('jsonrecibido')?.value;

  return NextResponse.json({ data: jsonData ? JSON.parse(jsonData) : null });
}
