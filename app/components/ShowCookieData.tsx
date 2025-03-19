'use client';

import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

export default function ShowCookieData() {
  const [cookieData, setCookieData] = useState<any>(null);

  useEffect(() => {
    const checkCookie = () => {
      const cookie = getCookie('jsonrecibido');
      if (cookie) {
        const parsedData = JSON.parse(cookie);
        setCookieData(parsedData);
      }
    };

    // Revisar la cookie cada 3 segundos
    const interval = setInterval(checkCookie, 3000);
    checkCookie(); // Revisar inmediatamente al montar

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Información de la cookie:</h1>
      {cookieData ? (
        <pre>{JSON.stringify(cookieData, null, 2)}</pre>
      ) : (
        <p>No se encontró la cookie "jsonrecibido".</p>
      )}
    </div>
  );
}
