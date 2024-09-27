// 'use client';
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { fetchProperties } from '@/lib/server/fetchProducts';

// interface Property {
//   id: number;
//   name: string;
//   location: string;
//   owner: { uuid: string };
//   type: 'HOTEL' | 'CABANA' | 'DEPARTAMENTO';
//   propertyImages: string[];
//   rooms: {
//     room_number: number;
//     capacity: number;
//     price_per_day: number;
//     disponibility: 'available' | 'reserved';
//     roomImages: string[];
//     services: string[];
//     category: 'STANDARD' | 'DELUXE' | 'SUITE';
//   }[];
//   isPublished?: boolean;
// }

// interface PropertyListProps {
//   currentPage: number;
//   totalPages: number;
//   setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
// }

// const PropertyList: React.FC<PropertyListProps> = ({ currentPage, totalPages, setCurrentPage }) => {
//   const [properties, setProperties] = useState<Property[]>([]);

//   useEffect(() => {
//     const getProperties = async () => {
//       const data = await fetchProperties();
//       setProperties(data);
//     };

//     getProperties();
//   }, []);

//   return (
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {properties.map((property) => (
//           <Link href={`/property/${property.id}`} key={property.id}>
//             <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
//               {property.propertyImages.length > 0 && (
//                 <Image
//                   src={property.propertyImages[0]}
//                   alt={property.name}
//                   width={300}
//                   height={200}
//                   className="w-full h-48 object-cover"
//                 />
//               )}
//               <div className="p-4">
//                 <h2 className="text-xl font-semibold mb-2">{property.name}</h2>
//                 <p className="text-gray-600 mb-2">{property.location}</p>
//                 <p className="text-gray-600 mb-2">Tipo: {property.type}</p>
//                 <p className="text-gray-600">
//                   Desde $
//                   {Math.min(...property.rooms.map((room) => room.price_per_day))}
//                   /noche
//                 </p>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//       <div className="mt-8 flex justify-center">
//         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//           <button
//             key={page}
//             onClick={() => setCurrentPage(page)}
//             className={`mx-1 px-3 py-1 rounded ${
//               currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
//             }`}
//           >
//             {page}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PropertyList;


import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchProperties } from '@/lib/server/fetchProducts';

interface Property {
  id: number;
  name: string;
  location: string;
  owner: { uuid: string };
  type: 'HOTEL' | 'CABANA' | 'DEPARTAMENTO';
  propertyImages: string[];
  rooms: {
    room_number: number;
    capacity: number;
    price_per_day: number;
    disponibility: 'available' | 'reserved';
    roomImages: string[];
    services: string[];
    category: 'STANDARD' | 'DELUXE' | 'SUITE';
  }[];
  isPublished?: boolean;
}

interface PropertyListProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const PropertyList: React.FC<PropertyListProps> = ({ currentPage, totalPages, setCurrentPage }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const getProperties = async () => {
      try {
        const data = await fetchProperties();
        setProperties(data || []); // Asegurarse de que los datos sean un array
      } catch (error) {
        console.error("Error fetching properties:", error);
        setProperties([]); // Si hay un error, usar un array vacío
      } finally {
        setLoading(false); // Desactivar el estado de carga
      }
    };

    getProperties();
  }, []);

  if (loading) {
    return <p>Cargando propiedades...</p>; // Mensaje de carga mientras se obtienen los datos
  }

  if (!properties || properties.length === 0) {
    return <p>No se encontraron propiedades.</p>; // Mensaje en caso de que no haya propiedades
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Link href={`/detail/${property.id}`} key={property.id}>
            <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              {property.propertyImages.length > 0 && (
                <Image
                  src={property.propertyImages[0]}
                  alt={property.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{property.name}</h2>
                <p className="text-gray-600 mb-2">{property.location}</p>
                <p className="text-gray-600 mb-2">Tipo: {property.type}</p>
                <p className="text-gray-600">
                  Desde $
                  {Math.min(...property.rooms.map((room) => room.price_per_day))}
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