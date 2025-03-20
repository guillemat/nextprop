'use client';

import { useEffect, useState } from 'react';

export default function InfoPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/get-json')
      .then((res) => res.json())
      .then((json) => setData(json.data));
  }, []);

  return (
    <div>
      <h1>Último JSON en Supabase:</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Cargando datos...</p>}
    </div>
  );
}
