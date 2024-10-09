import React from 'react';
import Image from 'next/image';
import { IProperty } from '@/interfaces/Interfaces';

interface PropertyDetailProps {
  property: IProperty;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {property.propImg && property.propImg.length > 0 ? (
            <Image
              src={property.propImg[0].img}
              alt={property.name}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-[400px]"
            />
          ) : (
            <div className="w-full h-[400px] flex items-center justify-center bg-gray-200 text-gray-600 rounded-lg">
              <span>Sin imagen</span>
            </div>
          )}
        </div>
        <div>
          <p className="text-xl mb-2"><strong>Ubicación:</strong> {property.location}</p>
          <p className="text-xl mb-2"><strong>Tipo de propiedad:</strong> {property.propertyType}</p>
          <p className="text-xl mb-2"><strong>Calificación:</strong> {property.rate} / 5</p>
          <p className="text-xl mb-4"><strong>Estado:</strong> {property.isActive ? 'Activo' : 'Inactivo'}</p>
          
          <h2 className="text-2xl font-semibold mb-2">Habitaciones</h2>
          {property.room && property.room.length > 0 ? (
            <ul className="list-disc pl-5">
              {property.room.map((room) => (
                <li key={room.uuid} className="mb-2">
                  <p>Número de habitación: {room.room_number}</p>
                  <p>Capacidad: {room.capacity} personas</p>
                  <p>Precio por día: ${room.price_per_day}</p>
                  <p>Disponibilidad: {room.disponibility}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay información de habitaciones disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;