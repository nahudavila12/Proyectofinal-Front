import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchProperties } from '@/lib/server/fetchProperties';
import { IProperty } from '@/interfaces/Interfaces';

interface PropertyListProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const PropertyList: React.FC<PropertyListProps> = ({ currentPage, totalPages, setCurrentPage }) => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const data = await fetchProperties();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    getProperties();
  }, []);

  if (loading) {
    return <p>Cargando propiedades...</p>;
  }

  if (!properties || properties.length === 0) {
    return <p>No se encontraron propiedades.</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Link href={`/detail/${property.uuid}`} key={property.uuid}>
            <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              {property.propImg && property.propImg.length > 0 ? (
                <Image
                  src={property.propImg[0].img} // Mostrar la primera imagen si existe
                  alt={property.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-gray-600">
                  <span>Sin imagen</span>
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{property.name}</h2>
                <p className="text-gray-600 mb-2">{property.location}</p>
                <p className="text-gray-600 mb-2">Tipo: {property.propertyType}</p>
                <p className="text-gray-600">
                  Desde $
                  {property.room && property.room.length > 0
                    ? Math.min(...property.room.map((room) => room.price_per_day))
                    : "Sin precio disponible"}
                  /noche
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;