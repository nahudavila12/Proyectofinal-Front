import React, { useEffect, useState } from 'react';
import { IProperty } from '@/interfaces/Interfaces';

export default function PropertiesSection() {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch('http://localhost:3001/properties');
        if (!res.ok) {
          throw new Error('Error al obtener las propiedades');
        }
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  async function editProperty(uuid: string) {
    // Lógica para editar la propiedad
    // Aquí deberías implementar la lógica para abrir un modal o algo similar
    // donde se pueda editar la propiedad.

    // Ejemplo de llamada al backend para editar
    const updatedProperty = { /* Propiedad actualizada */ };
    try {
      const res = await fetch(`http://localhost:3001/owner/propertie/update/${uuid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProperty),
      });

      if (!res.ok) {
        throw new Error('Error al editar la propiedad');
      }

      const data = await res.json();
      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property.uuid === uuid ? data : property
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  }

  async function banProperty(uuid: string) {
    try {
      const res = await fetch(`http://localhost:3001/admin/propertie/ban/${uuid}`, {
        method: 'PATCH',
      });

      if (!res.ok) {
        throw new Error('Error al banear la propiedad');
      }

      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property.uuid === uuid ? { ...property, isActive: false } : property
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  }

  async function deleteProperty(uuid: string) {
    try {
      const res = await fetch(`http://localhost:3001/owner/propertie/delete/${uuid}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Error al eliminar la propiedad');
      }

      setProperties((prevProperties) =>
        prevProperties.filter((property) => property.uuid !== uuid)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  }

  if (loading) {
    return <div>Cargando propiedades...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Propiedades</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border-b-2 pb-2">Nombre</th>
            <th className="border-b-2 pb-2">Ubicación</th>
            <th className="border-b-2 pb-2">Tipo</th>
            <th className="border-b-2 pb-2">Estado</th>
            <th className="border-b-2 pb-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.uuid}>
              <td className="py-2">{property.name}</td>
              <td className="py-2">{property.location}</td>
              <td className="py-2">{property.propertyType}</td>
              <td className="py-2">{property.isActive ? 'Activo' : 'Baneado'}</td>
              <td className="py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                  onClick={() => editProperty(property.uuid)}
                >
                  Editar
                </button>
                <button
                  className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
                  onClick={() => banProperty(property.uuid)}
                >
                  Banear
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded"
                  onClick={() => deleteProperty(property.uuid)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
