"use client";

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

  useEffect(() => {
    // Obtener el UUID del owner desde localStorage
    const uuid = localStorage.getItem('ownerUUID'); // Asegúrate de que la clave sea la misma que usaste al almacenar
    setOwnerUUID(uuid);
  }, []);

  if (!ownerUUID) {
    return <div>Loading...</div>; // O cualquier mensaje que quieras mostrar mientras se carga el UUID
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Agregar Nuevo Alojamiento</h1>
      <PropertyForm onSubmit={handleSubmit} onCancel={handleCancel} ownerUUID={ownerUUID} />
    </div>
  );
}