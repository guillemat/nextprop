// app/api/initdb/route.ts
import { openDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const db = await openDb();

  // Crea una tabla para almacenar el JSON
  await db.exec(`
    CREATE TABLE IF NOT EXISTS json_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data TEXT
    )
  `);

  return NextResponse.json({ message: 'Database initialized' });
}