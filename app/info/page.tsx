import { cookies } from 'next/headers';

export default function MiPagina() {
  const getCookieData = async () => {
    const cookie = (await cookies()).get('jsonrecibido');
    const jsonCookie = cookie ? cookie.value : null;
    return jsonCookie;
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
