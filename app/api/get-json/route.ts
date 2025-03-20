// app/api/get/route.ts
import { openDb } from '@/lib/db';
import { MyData } from '../../types/types';
import { NextResponse } from 'next/server';

export async function GET() {
  const db = await openDb();

  // Recupera el JSON de la base de datos
  const row = await db.get('SELECT * FROM json_data ORDER BY id DESC LIMIT 1');

  if (row) {
    const data = JSON.parse(row.data) as MyData; // Convierte el string a JSON
    return NextResponse.json(data);
  } else {
    return NextResponse.json({ message: 'No data found' }, { status: 404 });
  }
}