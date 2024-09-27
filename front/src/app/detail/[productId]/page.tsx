import React from 'react';
import Image from 'next/image';
import { fetchPropertiesById } from '@/lib/server/fetchProducts';
import PropertyDetail from '@/components/Property-detail';
import { IProperty } from '@/interfaces/Interfaces';

interface PropertyDetailPageProps {
  params: {
    propertiuuid: string;
  };
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const property: IProperty = await fetchPropertiesById(params.propertiuuid);

  if (!property) {
    return <div className="container mx-auto p-4">Propiedad no encontrada</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
          
          {property.img.length > 0 && (
            <Image
              src={property.img[0]?.img || '/placeholder-image.png'}
              alt={property.name}
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-md"
            />
          )}
          
          <div className="mt-4 space-y-2">
            <p className="text-lg"><strong>Ubicación:</strong> {property.location}</p>
            <p className="text-lg"><strong>Tipo de Propiedad:</strong> {property.propertyType}</p>
            <div className="flex items-center">
              <span className="text-2xl text-yellow-500 mr-2">★</span>
              <span className="text-lg"><strong>Calificación:</strong> {property.rate.toFixed(1)}</span>
            </div>
            {property.room && property.room.length > 0 && (
              <p className="text-xl font-semibold">Precio desde: ${property.room[0].price_per_day}/noche</p>
            )}
          </div>
        </div>
        
        <div>
        <PropertyDetail initialProperty={property} />
        </div>
      </div>
    </div>
  );
}