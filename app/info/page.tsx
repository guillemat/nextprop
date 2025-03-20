'use client'; 

import { useState } from 'react';
import { MyData } from '../types/types';

export default function Info() {
  const [jsonData, setJsonData] = useState<MyData | null>(null);

  const getData = async () => {
    const response = await fetch('/api/get-json');
    const data = (await response.json()) as MyData;
    setJsonData(data);
    console.log('Retrieved data:', data);
  };

  return (
    <div>
      <h1>Json recibido</h1>
      <button onClick={getData}>Get JSON</button>

      {jsonData && (
        <div>
          <h2>Retrieved JSON:</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}