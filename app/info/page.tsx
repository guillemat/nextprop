import { cookies } from 'next/headers';

export default function MiPagina() {
  const getCookieData =  () => {
    const cookieStore = cookies();
    const jsonCookie = cookieStore.get('jsonrecibido')?.value;
    return jsonCookie ? JSON.parse(jsonCookie) : null;
  };

  const parsedData = getCookieData();

  return (
    <div>
      <h1>Mi Página</h1>
      {parsedData ? (
        <pre>{JSON.stringify(parsedData, null, 2)}</pre>
      ) : (
        <p>No se encontró la cookie "jsonrecibido".</p>
      )}
    </div>
  );
}
