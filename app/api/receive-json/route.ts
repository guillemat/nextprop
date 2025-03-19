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
    const body: RequestBody = await request.json();
    const jsonString = JSON.stringify(body);
    (await cookies()).set('jsonrecibido', jsonString, {
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    });
    return NextResponse.json(
      { message: 'JSON recibido correctamente', data: body },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { message: 'Error al procesar el JSON', error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  const cookieStore = cookies();
  const jsonData = cookieStore.get('jsonrecibido')?.value;

  return NextResponse.json({ data: jsonData ? JSON.parse(jsonData) : null });
}
