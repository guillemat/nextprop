// app/api/save/route.ts
import { openDb } from '@/lib/db';
import { MyData } from '../../types/types';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const db = await openDb();
  const { data } = (await request.json()) as { data: MyData }; // El JSON que se va a guardar

  // Inserta el JSON en la base de datos
  const result = await db.run('INSERT INTO json_data (data) VALUES (?)', [
    JSON.stringify(data), // Convierte el JSON a string
  ]);

  return NextResponse.json({ id: result.lastID });
}