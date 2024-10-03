'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export enum PropertyType {
  HOTEL = 'Hotel',
  CABANA = 'Cabaña',
  DEPARTAMENTO = 'Departamento',
}

export enum ICategories {
  STANDARD = 'Estandar',
  DELUXE = 'Deluxe',
  SUITE = 'Suite'
}


export enum IRoomState {
  Avaiable = 'Disponible',
  Reserved = 'Reservado',
  Occupied = 'Ocupado',
  Maintenance = 'Mantenimiento',
}

export interface IRoom {
  uuid: string;
  room_number: number;
  category: ICategories;
  capacity: number;
  price_per_day: number;
  disponibility: IRoomState;
  img: { uuid: string; img: string }[];
  roomServices?: { id: string; serviceName: string }[];
}

export interface IProperty {
  uuid: string;
  name: string;
  location: string;
  propertyType: PropertyType;
  owner: string;
  propImg: { uuid: string; img: string }[];
  rooms: IRoom[];
}

interface AccommodationFormProps {
  onSubmit: (property: IProperty) => void;
  initialData?: IProperty | null;
  onCancel: () => void;
}

export default function AccommodationForm({ onSubmit, initialData, onCancel }: AccommodationFormProps) {
  const [property, setProperty] = useState<IProperty>({
    uuid: '',
    name: '',
    location: '',
    propertyType: PropertyType.HOTEL,
    owner: '',
    propImg: [],
    rooms: []
  })

  const [currentRoom, setCurrentRoom] = useState<IRoom>({
    uuid: '',
    room_number: 0,
    category: ICategories.STANDARD,
    capacity: 1,
    price_per_day: 0,
    disponibility: IRoomState.Avaiable,
    img: [],
    roomServices: []
  })

  useEffect(() => {
    if (initialData) {
      setProperty(initialData)
    }
  }, [initialData])

  const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProperty(prev => ({ ...prev, [name]: value }))
  }

  const handlePropertyImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImage = {
        uuid: Date.now().toString(),
        img: URL.createObjectURL(e.target.files[0])
      }
      setProperty(prev => ({ ...prev, img: [...prev.propImg, newImage] }))
    }
  }

  const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCurrentRoom(prev => ({ ...prev, [name]: value }))
  }

  const handleRoomImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImage = {
        uuid: Date.now().toString(),
        img: URL.createObjectURL(e.target.files[0])
      }
      setCurrentRoom(prev => ({ ...prev, img: [...prev.img, newImage] }))
    }
  }

  const handleServiceAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      const newService = {
        id: Date.now().toString(),
        serviceName: e.currentTarget.value
      }
      setCurrentRoom(prev => ({
        ...prev,
        roomServices: [...(prev.roomServices || []), newService]
      }))
      e.currentTarget.value = ''
    }
  }

  const handleAddRoom = () => {
    setProperty(prev => ({
      ...prev,
      room: [...prev.rooms, { ...currentRoom, uuid: Date.now().toString() }]
    }))
    setCurrentRoom({
      uuid: '',
      room_number: 0,
      category: ICategories.STANDARD,
      capacity: 1,
      price_per_day: 0,
      disponibility: IRoomState.Avaiable,
      img: [],
      roomServices: []
    })
  }

  const handleDeleteRoom = (uuid: string) => {
    setProperty(prev => ({
      ...prev,
      room: prev.rooms.filter(rooms => rooms.uuid !== uuid)
    }))
  }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   onSubmit({ ...property, uuid: property.uuid || Date.now().toString() })
  // }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    // Agregar propiedades al FormData
    formData.append('name', property.name);
    formData.append('location', property.location);
    formData.append('owner', property.owner);
    formData.append('propertyType', property.propertyType);
    
    // Agregar imágenes de la propiedad
    property.propImg.forEach((img) => {
      const file = img.img; // Asegúrate de que img.img sea un archivo
      if (file) {
        formData.append('propImg', file); // Aquí usas el nombre de tu campo en el backend
      }
    });
  
    // Agregar habitaciones al FormData
    property.rooms.forEach((room) => {
      formData.append('rooms[]', JSON.stringify(room)); // Agregar cada habitación como un JSON string
    });
  
    // Hacer la petición al backend
    try {
      const response = await fetch(`http://localhost:3001/properties/addProperty/${property.uuid}`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Error en la creación de la propiedad');
      }
  
      const result = await response.json();
      onSubmit(result); // Aquí puedes manejar la respuesta después de la creación exitosa
    } catch (error) {
      console.error('Error:', error);
      // Maneja errores según sea necesario
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">{initialData ? 'Editar' : 'Crear'} Alojamiento</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Alojamiento</label>
            <input
              id="name"
              name="name"
              type="text"
              value={property.name}
              onChange={handlePropertyChange}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Ubicación</label>
            <input
              id="location"
              name="location"
              type="text"
              value={property.location}
              onChange={handlePropertyChange}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Propietario</label>
            <input
              id="owner"
              name="owner"
              type="text"
              value={property.owner}
              onChange={handlePropertyChange}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">Tipo de Propiedad</label>
            <select
              id="propertyType"
              name="propertyType"
              value={property.propertyType}
              onChange={handlePropertyChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {Object.values(PropertyType).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="propImg" className="block text-sm font-medium text-gray-700">Imágenes de la Propiedad</label>
            <input
              id="propImg"
              type="file"
              onChange={handlePropertyImageAdd}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {property.propImg.map((img) => (
                <Image key={img.uuid} src={img.img} alt="Property" width={80} height={80} className="object-cover rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Agregar Habitación</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="room_number" className="block text-sm font-medium text-gray-700">Número de Habitación</label>
            <input
              id="room_number"
              name="room_number"
              type="number"
              value={currentRoom.room_number}
              onChange={handleRoomChange}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
            <select
              id="category"
              name="category"
              value={currentRoom.category}
              onChange={handleRoomChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {Object.values(ICategories).map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Capacidad</label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              value={currentRoom.capacity}
              onChange={handleRoomChange}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="price_per_day" className="block text-sm font-medium text-gray-700">Precio por Día</label>
            <input
              id="price_per_day"
              name="price_per_day"
              type="number"
              value={currentRoom.price_per_day}
              onChange={handleRoomChange}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="disponibility" className="block text-sm font-medium text-gray-700">Disponibilidad</label>
            <select
              id="disponibility"
              name="disponibility"
              value={currentRoom.disponibility}
              onChange={handleRoomChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {Object.values(IRoomState).map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="roomImage" className="block text-sm font-medium text-gray-700">Imágenes de la Habitación</label>
            <input
              id="roomImage"
              type="file"
              onChange={handleRoomImageAdd}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {currentRoom.img.map((img) => (
                <Image key={img.uuid} src={img.img} alt="Room" width={80} height={80} className="object-cover rounded" />
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="services" className="block text-sm font-medium text-gray-700">Servicios (presiona Enter para agregar)</label>
            <input
              id="services"
              type="text"
              onKeyPress={handleServiceAdd}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {currentRoom.roomServices?.map((service) => (
                <span key={service.id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{service.serviceName}</span>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddRoom}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Agregar Habitación
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Habitaciones Agregadas</h3>
        <div className="space-y-4">
          {property.rooms.map((room) => (
            <div key={room.uuid} className="border p-4 rounded-md flex justify-between items-center">
              <div>
                <p>Número: {room.room_number}</p>
                <p>Categoría: {room.category}</p>
                <p>Capacidad: {room.capacity}</p>
                <p>Precio por día: ${room.price_per_day}</p>
                <p>Disponibilidad: {room.disponibility}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteRoom(room.uuid)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {initialData ? 'Actualizar' : 'Crear'} Alojamiento
        </button>
      </div>
    </form>
  )
}