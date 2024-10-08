'use client';

import { useState } from 'react';
import { PropertyFilters as FilterType } from "@/app/home/page";
import { IProperty } from '@/interfaces/Interfaces';

interface PropertyFiltersProps {
  filters: FilterType;
  setFilters: (filters: FilterType) => void;
  setProperties: (properties: IProperty[]) => void; 
}

export function PropertyFilters({ filters, setFilters, setProperties }: PropertyFiltersProps) {
  const [localFilters, setLocalFilters] = useState<FilterType>(filters);
  const [roomUuid, setRoomUuid] = useState<string | undefined>(undefined);

  const handleSearch = async () => {
    console.log('roomUuid:', roomUuid); // Verifica el valor de roomUuid
    setFilters(localFilters);

    // Validaciones previas
    if (localFilters.minPrice !== undefined && localFilters.minPrice < 0) {
      console.error('El precio mínimo no puede ser negativo');
      return;
    }
    
    if (localFilters.maxPrice !== undefined && localFilters.maxPrice < 0) {
      console.error('El precio máximo no puede ser negativo');
      return;
    }

    if (localFilters.minPrice !== undefined && localFilters.maxPrice !== undefined && localFilters.minPrice > localFilters.maxPrice) {
      console.error('El precio mínimo no puede ser mayor que el precio máximo');
      return;
    }

    // Asegúrate de que se incluya 'roomUuid'
    if (!roomUuid) {
      console.error('El UUID de la habitación es requerido para la búsqueda');
      return;
    }

    // Validar que roomUuid es un UUID (opcional)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(roomUuid)) {
      console.error('El UUID de la habitación no es válido');
      return;
    }

    try {
      const filteredFilters = {
        ...localFilters,
        roomUuid, // Añadiendo el uuid de la habitación a los filtros
      };

      const queryString = new URLSearchParams(
        Object.entries(filteredFilters).map(([key, value]) => [
          key,
          typeof value === 'number' ? value.toString() : value,
        ])
      ).toString();

      const res = await fetch(`http://localhost:3000/properties/search?${queryString}`);

      if (!res.ok) {
        const errorDetails = await res.text(); // Captura el cuerpo de la respuesta para más detalles
        throw new Error(`Error al buscar propiedades: ${errorDetails}`);
      }

      const data = await res.json();
      setProperties(data.data);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Filtros</h2>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
        <input
          id="location"
          type="text"
          value={localFilters.location || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, location: e.target.value })}
          placeholder="Ingrese ubicación"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Propiedad</label>
        <select
          id="propertyType"
          value={localFilters.type || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, type: e.target.value as FilterType['type'] })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccionar tipo</option>
          <option value="HOTEL">Hotel</option>
          <option value="CABANA">Cabaña</option>
          <option value="DEPARTAMENTO">Departamento</option>
        </select>
      </div>
      <div>
        <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">Precio Mínimo</label>
        <input
          id="minPrice"
          type="number"
          value={localFilters.minPrice || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, minPrice: Number(e.target.value) })}
          placeholder="Ingrese precio mínimo"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">Precio Máximo</label>
        <input
          id="maxPrice"
          type="number"
          value={localFilters.maxPrice || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, maxPrice: Number(e.target.value) })}
          placeholder="Ingrese precio máximo"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="roomUuid" className="block text-sm font-medium text-gray-700 mb-1">UUID de Habitación</label>
        <input
          id="roomUuid"
          type="text"
          value={roomUuid || ''} // Asegúrate de que se esté utilizando correctamente
          onChange={(e) => setRoomUuid(e.target.value)} // Manejar el cambio del UUID
          placeholder="Ingrese UUID de habitación"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleSearch}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Buscar
      </button>
    </div>
  );
}
