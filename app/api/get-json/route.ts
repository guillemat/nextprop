import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('json')
    .select('json_text')
    .order('id', { ascending: false })
    .limit(1)
    .single();

    
    

  if (error) return NextResponse.json({ error: 'Error al obtener datos' }, { status: 500 });

  return NextResponse.json({ data: data ? JSON.parse(data.json_text) : {} });
}
