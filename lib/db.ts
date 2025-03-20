// lib/db.ts
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

// Abre la conexión a la base de datos
export async function openDb(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
  return open({
    filename: './database.db', // Archivo de la base de datos
    driver: sqlite3.Database,
  });
}