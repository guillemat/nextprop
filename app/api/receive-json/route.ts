import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
       
    const body = await request.json();
    const { error } = await supabase
      .from('json')
      .insert([{ json_text: JSON.stringify(body) }]);
    console.log('error', error);
    
    if (error) throw error;

    return NextResponse.json({ message: 'JSON almacenado correctamente' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al guardar en Supabase' }, { status: 500 });
  }
}
