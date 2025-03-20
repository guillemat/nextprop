'use client';

import { useState, useEffect } from 'react';

export default function InfoPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false); // Estado para manejar la carga

  // Función para obtener los datos
  const fetchData = async () => {
    setLoading(true); // Activar el estado de carga
    try {
      const response = await fetch('/api/get-json');
      const json = await response.json();
      setData(json.data); // Actualizar el estado con los datos
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  // Ejecutar fetchData al cargar la página por primera vez
  useEffect(() => {
    fetchData();
  }, []); // El array vacío [] asegura que solo se ejecute una vez

  return (
    <div>
      <h1>Último JSON en Supabase:</h1>
      
      {/* Botón para cargar los datos */}
      <button
        onClick={fetchData}
        disabled={loading} // Deshabilitar el botón mientras se carga
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#ccc' : '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Cargando...' : 'Obtener JSON'}
      </button>

      {/* Mostrar los datos */}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>{loading ? 'Cargando datos...' : 'No hay datos disponibles.'}</p>
      )}
    </div>
  );
}