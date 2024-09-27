'use client'

import { useState } from 'react'
import Image from 'next/image'
import AccommodationForm, { IProperty } from '../PropertyForm';





export default function PropertyOwnerList() {
  const [properties, setProperties] = useState<IProperty[]>([])
  const [editingProperty, setEditingProperty] = useState<IProperty | null>(null)
  const [isFormVisible, setIsFormVisible] = useState(false)

  const handleCreateProperty = (newProperty: IProperty) => {
    setProperties([...properties, newProperty])
    setIsFormVisible(false)
  }

  const handleUpdateProperty = (updatedProperty: IProperty) => {
    setProperties(properties.map(prop => prop.uuid === updatedProperty.uuid ? updatedProperty : prop))
    setEditingProperty(null)
    setIsFormVisible(false)
  }

  const handleDeleteProperty = (uuid: string) => {
    setProperties(properties.filter(prop => prop.uuid !== uuid))
  }

  const handleTogglePublish = (uuid: string) => {
    setProperties(properties.map(prop => 
      prop.uuid === uuid ? { ...prop, isActive: !prop.isActive } : prop
    ))
  }

  const handleEditProperty = (property: IProperty) => {
    setEditingProperty(property)
    setIsFormVisible(true)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Propietario</h1>
      <button
        onClick={() => {
          setEditingProperty(null)
          setIsFormVisible(true)
        }}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Crear Nuevo Alojamiento
      </button>

      {isFormVisible && (
        <AccommodationForm
          onSubmit={editingProperty ? handleUpdateProperty : handleCreateProperty}
          initialData={editingProperty}
          onCancel={() => {
            setIsFormVisible(false)
            setEditingProperty(null)
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map(property => (
          <div key={property.uuid} className="border rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold">{property.name}</h2>
            <p>{property.location}</p>
            <p>Tipo: {property.propertyType}</p>
            <p>Calificación: {property.rate}</p>
            <p>Estado: {property.isActive ? 'Publicado' : 'No publicado'}</p>
            {property.img.length > 0 && (
              <Image
                src={property.img[0].img}
                alt={property.name}
                width={200}
                height={150}
                className="mt-2 rounded"
              />
            )}
            <div className="mt-4 space-x-2">
              <button
                onClick={() => handleEditProperty(property)}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteProperty(property.uuid)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Eliminar
              </button>
              <button
                onClick={() => handleTogglePublish(property.uuid)}
                className={`px-3 py-1 ${
                  property.isActive ? 'bg-yellow-600' : 'bg-green-600'
                } text-white rounded`}
              >
                {property.isActive ? 'Despublicar' : 'Publicar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}