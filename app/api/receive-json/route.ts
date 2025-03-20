// app/api/receive-json/route.ts
import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db'; // Asegúrate de que esta ruta sea correcta

// Definimos la interfaz para el cuerpo de la solicitud
interface RequestBody {
  [key: string]: any; // Puedes ajustar esto según la estructura de tu JSON
}

export async function POST(request: Request) {
  try {
    // Parseamos el cuerpo de la solicitud como JSON
    const body: RequestBody = await request.json();

    // Abrimos la conexión a la base de datos
    const db = await openDb();

    // Convertimos el JSON a una cadena para almacenarlo en SQLite
    const jsonString = JSON.stringify(body);

    // Insertamos el JSON en la base de datos
    const result = await db.run('INSERT INTO json_data (data) VALUES (?)', [jsonString]);

    // Respondemos con un mensaje de éxito y el ID del registro insertado
    return NextResponse.json(
      { message: 'JSON recibido y guardado correctamente', id: result.lastID },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Si hay un error, respondemos con un código de estado 500
    return NextResponse.json(
      {
        message: 'Error al procesar el JSON',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Nueva API para obtener el JSON almacenado en SQLite
export async function GET() {
  try {
    // Abrimos la conexión a la base de datos
    const db = await openDb();

    // Recuperamos el último JSON almacenado
    const row = await db.get('SELECT * FROM json_data ORDER BY id DESC LIMIT 1');

    if (row) {
      // Convertimos el string de vuelta a JSON
      const jsonData = JSON.parse(row.data);
      return NextResponse.json({ data: jsonData });
    } else {
      // Si no hay datos, respondemos con un mensaje
      return NextResponse.json({ message: 'No hay datos almacenados' }, { status: 404 });
    }
  } catch (error: unknown) {
    // Si hay un error, respondemos con un código de estado 500
    return NextResponse.json(
      {
        message: 'Error al recuperar el JSON',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}