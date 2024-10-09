"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  IProperty,
  IRoom,
  IReservation,
} from "@/interfaces/Interfaces";
import ReservationForm from "../Reservations";

interface PropertyDetailProps {
  property: IProperty;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  const [selectedRoom, setSelectedRoom] = useState<IRoom | null>(null);
  const [reservationCompleted, setReservationCompleted] = useState<IReservation | null>(null);
  const [paymentCompleted, ] = useState<boolean>(false);

  const handleReservationComplete = (reservation: IReservation) => {
    setReservationCompleted(reservation);
  };

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
          <p className="text-xl mb-2">
            <strong>Ubicación:</strong> {property.location}
          </p>
          <p className="text-xl mb-2">
            <strong>Tipo de propiedad:</strong> {property.propertyType}
          </p>
          <p className="text-xl mb-2">
            <strong>Calificación:</strong> {property.rate} / 5
          </p>
          <p className="text-xl mb-4">
            <strong>Estado:</strong> {property.isActive ? "Activo" : "Inactivo"}
          </p>

          <h2 className="text-2xl font-semibold mb-2">Habitaciones</h2>
          {property.room && property.room.length > 0 ? (
            <ul className="list-disc pl-5">
              {property.room.map((room) => (
                <li key={room.uuid} className="mb-2">
                  <p>Número de habitación: {room.room_number}</p>
                  <p>Capacidad: {room.capacity} personas</p>
                  <p>Precio por día: ${room.price_per_day}</p>
                  <p>Disponibilidad: {room.disponibility}</p>
                  <button
                    className="mt-2 text-blue-500 hover:underline"
                    onClick={() => setSelectedRoom(room)}
                  >
                    Reservar esta habitación
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay información de habitaciones disponibles.</p>
          )}
        </div>
      </div>

      {selectedRoom && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Formulario de Reserva</h2>
          <ReservationForm
            room={selectedRoom}
            onReservationComplete={handleReservationComplete}
          />

          {/* Mensaje de pago completado */}
          {paymentCompleted && (
            <div className="mt-4 text-green-600">
              ¡Pago completado con éxito! Tu reserva ha sido confirmada.
            </div>
          )}
        </div>
      )}

      {reservationCompleted && (
        <div className="mt-8 text-green-600">
          <p>¡Reserva completada para la habitación {reservationCompleted.room.room_number}!</p>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
