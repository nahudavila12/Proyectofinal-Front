"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PropertyForm, { IProperty } from '@/components/PropertyForm';

export default function EditPropertyPage({ params }: { params: { id: string } }) {
  const [property, setProperty] = useState<IProperty | null>(null);
  const [ownerUUID, setOwnerUUID] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Obtener el UUID del owner desde localStorage
    const uuid = localStorage.getItem('ownerUUID'); // Asegúrate de que la clave sea la misma que usaste al almacenar
    setOwnerUUID(uuid);
  }, []);

  useEffect(() => {
    const fetchProperty = () => {
      const storedProperties = JSON.parse(localStorage.getItem('properties') || '[]');
      const foundProperty = storedProperties.find((p: IProperty) => p.uuid === params.id);
      
      if (foundProperty) {
        setProperty(foundProperty);
      } else {
        router.push('/property-own-list');
      }
    };
  
    if (params.id) {
      fetchProperty();
    }
  }, [params.id, router]);

  const handleUpdate = (updatedProperty: IProperty) => {
    const storedProperties = JSON.parse(localStorage.getItem('properties') || '[]');
    const updatedProperties = storedProperties.map((p: IProperty) =>
      p.uuid === updatedProperty.uuid ? updatedProperty : p
    );
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
    router.push('/property-own-list');
  };

  const handleCancel = () => {
    router.push('/property-own-list');
  };

  if (!property || !ownerUUID) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Editar Alojamiento</h1>
      <PropertyForm 
        initialData={property} 
        onSubmit={handleUpdate} 
        onCancel={handleCancel} 
        ownerUUID={ownerUUID} // Pasa el ownerUUID al PropertyForm
      />
    </div>
  );
}