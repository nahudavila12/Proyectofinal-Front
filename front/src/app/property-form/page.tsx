'use client';

import PropertyForm, { IProperty } from "@/components/PropertyForm";
import { useEffect, useState } from "react";

// Definir las funciones de onSubmit y onCancel
const handleSubmit = (property: IProperty) => {
  // Lógica para manejar el envío de la propiedad, como guardar en el backend
  console.log("Propiedad enviada:", property);
};

const handleCancel = () => {
  // Lógica para manejar la cancelación, como redirigir a otra página
  console.log("Formulario cancelado");
};

export default function NewHotel() {
  const [ownerUUID, setOwnerUUID] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const uuid = localStorage.getItem('ownerUUID');
    console.log('UUID obtenido de localStorage:', uuid); // Este debería mostrar el UUID correcto
    setOwnerUUID(uuid);
    setLoading(false);
  }, []);
  
  // Antes de renderizar el PropertyForm
  console.log('ownerUUID antes de renderizar PropertyForm:', ownerUUID);

  // Evita renderizar `PropertyForm` hasta que `ownerUUID` esté cargado
  if (loading || !ownerUUID) {
    return <div>Loading...</div>; // O cualquier mensaje que quieras mostrar mientras se carga el UUID
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Agregar Nuevo Alojamiento</h1>
      {/* Renderiza el formulario solo cuando `ownerUUID` esté cargado */}
      <PropertyForm onSubmit={handleSubmit} onCancel={handleCancel} ownerUUID={ownerUUID} />
    </div>
  );
}