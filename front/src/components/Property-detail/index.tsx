// 'use client'

// import { useState, useEffect } from 'react'
// import Image from 'next/image'
// import { useParams } from 'next/navigation'

// interface IRoom {
//   uuid: string;
//   room_number: number;
//   category: string;
//   capacity: number;
//   price_per_day: number;
//   disponibility: string;
//   img: { uuid: string; img: string }[];
// }

// interface IProperty {
//   uuid: string;
//   name: string;
//   location: string;
//   propertyType: string;
//   rate: number;
//   isActive: boolean;
//   img: { uuid: string; img: string }[];
//   room: IRoom[];
// }

// export default function PropertyDetail() {
//   const [property, setProperty] = useState<IProperty | null>(null)
//   const params = useParams()
//   const { id } = params

//   useEffect(() => {
//     // En una aplicación real, aquí harías una llamada a la API para obtener los detalles de la propiedad
//     // Por ahora, usaremos datos de ejemplo
//     const fetchProperty = async () => {
//       // Simular una llamada a la API
//       const response = await new Promise<IProperty>((resolve) => {
//         setTimeout(() => {
//           resolve({
//             uuid: '1',
//             name: 'Hotel Ejemplo',
//             location: 'Ciudad Ejemplo',
//             propertyType: 'hotel',
//             rate: 4.5,
//             isActive: true,
//             img: [
//               { uuid: '1', img: '/placeholder.svg?height=400&width=600' },
//               { uuid: '2', img: '/placeholder.svg?height=400&width=600' },
//             ],
//             room: [
//               {
//                 uuid: '1',
//                 room_number: 101,
//                 category: 'standard',
//                 capacity: 2,
//                 price_per_day: 100,
//                 disponibility: 'available',
//                 img: [
//                   { uuid: '1', img: '/placeholder.svg?height=200&width=300' },
//                   { uuid: '2', img: '/placeholder.svg?height=200&width=300' },
//                 ],
//               },
//               {
//                 uuid: '2',
//                 room_number: 102,
//                 category: 'deluxe',
//                 capacity: 3,
//                 price_per_day: 150,
//                 disponibility: 'available',
//                 img: [
//                   { uuid: '3', img: '/placeholder.svg?height=200&width=300' },
//                   { uuid: '4', img: '/placeholder.svg?height=200&width=300' },
//                 ],
//               },
//             ],
//           })
//         }, 1000)
//       })

//       setProperty(response)
//     }

//     if (id) {
//       fetchProperty()
//     }
//   }, [id])

//   if (!property) {
//     return <div className="container mx-auto p-4">Cargando...</div>
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">{property.name}</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <div>
//           <Image
//             src={property.img[0].img}
//             alt={property.name}
//             width={600}
//             height={400}
//             className="w-full h-auto rounded-lg shadow-md"
//           />
//         </div>
//         <div>
//           <p className="text-xl mb-2">Ubicación: {property.location}</p>
//           <p className="text-xl mb-2">Tipo: {property.propertyType}</p>
//           <div className="flex items-center mb-4">
//             <span className="text-2xl text-yellow-500 mr-2">★</span>
//             <span className="text-xl">{property.rate.toFixed(1)}</span>
//           </div>
//           <h2 className="text-2xl font-semibold mb-4">Imágenes del Alojamiento</h2>
//           <div className="grid grid-cols-3 gap-2">
//             {property.img.map((image) => (
//               <Image
//                 key={image.uuid}
//                 src={image.img}
//                 alt={property.name}
//                 width={150}
//                 height={100}
//                 className="w-full h-auto rounded shadow"
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//       <h2 className="text-2xl font-semibold mb-4">Habitaciones</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {property.room.map((room) => (
//           <div key={room.uuid} className="border rounded-lg overflow-hidden shadow-md">
//             <Image
//               src={room.img[0].img}
//               alt={`Room ${room.room_number}`}
//               width={300}
//               height={200}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2">Habitación {room.room_number}</h3>
//               <p className="mb-1">Categoría: {room.category}</p>
//               <p className="mb-1">Capacidad: {room.capacity} personas</p>
//               <p className="mb-1">Precio por día: ${room.price_per_day}</p>
//               <p className="mb-1">Disponibilidad: {room.disponibility}</p>
//               <h4 className="font-semibold mt-2 mb-1">Imágenes de la Habitación</h4>
//               <div className="grid grid-cols-3 gap-2">
//                 {room.img.map((image) => (
//                   <Image
//                     key={image.uuid}
//                     src={image.img}
//                     alt={`Room ${room.room_number}`}
//                     width={80}
//                     height={60}
//                     className="w-full h-auto rounded"
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }


// import { useState, useEffect } from 'react'
// import Image from 'next/image'
// import { useParams } from 'next/navigation'
// import { fetchPropertiesById } from '@/lib/server/fetchProducts'
// import { IRoom } from '@/interfaces/Interfaces';



// interface IProperty {
//   uuid: string;
//   name: string;
//   location: string;
//   propertyType: string;
//   rate: number;
//   isActive: boolean;
//   img: { uuid: string; img: string }[];
//   room: IRoom[];
// }

// export default function PropertyDetail() {
//   const [property, setProperty] = useState<IProperty | null>(null)
//   const params = useParams()
  
//   // Asegúrate de que `uuid` es un string y no un array
//   const uuid = Array.isArray(params.uuid) ? params.uuid[0] : params.uuid

//   useEffect(() => {
//     const fetchProperty = async () => {
//       if (uuid) {
//         const data = await fetchPropertiesById(uuid)
//         setProperty(data)
//       }
//     }

//     fetchProperty()
//   }, [uuid])

//   if (!property) {
//     return <div className="container mx-auto p-4">Cargando...</div>
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">{property.name}</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <div>
//           <Image
//             src={property.img[0].img}
//             alt={property.name}
//             width={600}
//             height={400}
//             className="w-full h-auto rounded-lg shadow-md"
//           />
//         </div>
//         <div>
//           <p className="text-xl mb-2">Ubicación: {property.location}</p>
//           <p className="text-xl mb-2">Tipo: {property.propertyType}</p>
//           <div className="flex items-center mb-4">
//             <span className="text-2xl text-yellow-500 mr-2">★</span>
//             <span className="text-xl">{property.rate.toFixed(1)}</span>
//           </div>
//         </div>
//       </div>
//       <h2 className="text-2xl font-semibold mb-4">Habitaciones</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {property.room.map((room) => (
//           <div key={room.uuid} className="border rounded-lg overflow-hidden shadow-md">
//             <Image
//               src={room.img[0].img}
//               alt={`Room ${room.room_number}`}
//               width={300}
//               height={200}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2">Habitación {room.room_number}</h3>
//               <p className="mb-1">Capacidad: {room.capacity} personas</p>
//               <p className="mb-1">Precio por día: ${room.price_per_day}</p>
//               <p className="mb-1">Disponibilidad: {room.disponibility}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

"use client";

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'




import { IOrderDetail, IReservation, IRoom } from '@/interfaces/Interfaces'
import ReservationForm from '../Reservations'
import OrderForm from '../Orders'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { fetchPropertiesById } from '@/lib/server/fetchProperties';

interface IProperty {
  uuid: string;
  name: string;
  location: string;
  propertyType: string;
  rate: number;
  isActive: boolean;
  img: { uuid: string; img: string }[];
  room: IRoom[];
}

interface PropertyDetailProps {
  initialProperty: IProperty;
}
export default function PropertyDetail({ initialProperty }: PropertyDetailProps) {
  const [property, setProperty] = useState<IProperty>(initialProperty)
  const [selectedRoom, setSelectedRoom] = useState<IRoom | null>(null)
  const [reservation, setReservation] = useState<IReservation | null>(null)
  const [orderDetail, setOrderDetail] = useState<IOrderDetail | null>(null)
  const params = useParams()
  
  const uuid = Array.isArray(params.uuid) ? params.uuid[0] : params.uuid

  useEffect(() => {
    const fetchProperty = async () => {
      if (uuid) {
        const data = await fetchPropertiesById(uuid)
        setProperty(data)
      }
    }
  
    if (uuid !== property.uuid) {
      fetchProperty()
    }
  }, [uuid, property.uuid])

  const handleRoomSelect = (room: IRoom) => {
    setSelectedRoom(room)
  }

  const handleReservationComplete = (newReservation: IReservation) => {
    setReservation(newReservation)
  }

  const handleOrderComplete = (newOrderDetail: IOrderDetail) => {
    setOrderDetail(newOrderDetail)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{property.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <Image
            src={property.img[0].img}
            alt={property.name}
            width={600}
            height={400}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div>
          <p className="text-xl mb-2">Ubicación: {property.location}</p>
          <p className="text-xl mb-2">Tipo: {property.propertyType}</p>
          <div className="flex items-center mb-4">
            <span className="text-2xl text-yellow-500 mr-2">★</span>
            <span className="text-xl">{property.rate.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Habitaciones</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {property.room.map((room) => (
          <div key={room.uuid} className="border rounded-lg overflow-hidden shadow-md">
            <Image
              src={room.img[0].img}
              alt={`Room ${room.room_number}`}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Habitación {room.room_number}</h3>
              <p className="mb-1">Capacidad: {room.capacity} personas</p>
              <p className="mb-1">Precio por día: ${room.price_per_day}</p>
              <p className="mb-1">Disponibilidad: {room.disponibility}</p>
              <button 
                onClick={() => handleRoomSelect(room)}
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Seleccionar
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedRoom && !reservation && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Reservar Habitación</h2>
          <ReservationForm room={selectedRoom} onReservationComplete={handleReservationComplete} />
        </div>
      )}

      {reservation && !orderDetail && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Detalles de la Orden</h2>
          <OrderForm reservation={reservation} onOrderComplete={handleOrderComplete} />
        </div>
      )}

      {orderDetail && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Proceder al Pago</h2>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                intent: "CAPTURE", // Se agrega la propiedad 'intent' requerida
                purchase_units: [
                  {
                    amount: {
                      currency_code: "USD",
                      value: orderDetail.total.toString(),
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order!.capture().then((details) => {
                const name = details.payer?.name?.given_name || "Cliente";
                alert(`Transaction completed by ${name}`);
                // Aquí puedes llamar a tu API para guardar los detalles de la transacción.
              });
            }}
          />
        </div>
      )}
    </div>
  )
}
