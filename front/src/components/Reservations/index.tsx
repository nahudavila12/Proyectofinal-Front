import React, { useContext, useState } from 'react';
import { IOrderDetail, IReservation, IRoom, IStateBooking, IUser } from '@/interfaces/Interfaces';
import PayPalButton from '../Paypal';
import { UserContext } from '@/context/user'; // Asegúrate de que la ruta sea correcta

export default function ReservationForm({ room, onReservationComplete }: { room: IRoom; onReservationComplete: (reservation: IReservation) => void; }) {
  const { user } = useContext(UserContext); // Obtener el usuario del contexto

  // Inicialización de estados
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [reservation, setReservation] = useState<IReservation | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState<boolean>(false);

  // Verificación de usuario
  if (!user || !user.uuid) {
    return <div>Error: Usuario no encontrado</div>;
  }

  // Asegúrate de que todas las propiedades requeridas de IUser estén presentes
  const currentUser: IUser = {
    uuid: user.uuid,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    user_name: user.user_name || '',
    birthday: user.birthday || '',
    email: user.email || '',
    address: user.address || '',
    country: user.country || '',
    phone: user.phone || '',
    password: user.password || '',
    isActive: user.isActive,
    rol: user.rol,
    profile: user.profile,
    owner: user.owner,
    orderdetail: user.orderdetail,
    reservation: user.reservation,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de fechas
    if (new Date(checkOut) <= new Date(checkIn)) {
      alert('La fecha de check-out debe ser posterior a la de check-in.');
      return;
    }

    const newReservation: IReservation = {
      uuid: crypto.randomUUID(),
      state: IStateBooking.PENDING,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      user: currentUser,
      room: room,
      order_detail: {} as IOrderDetail,
    };

    setReservation(newReservation);
    console.log("Reserva creada:", newReservation); // Log de la reserva creada
  };

  const handlePaymentSuccess = async (orderId: string) => {
    console.log("Pago exitoso:", orderId); // Log de pago exitoso
    console.log("Reserva antes del pago:", reservation); // Log de la reserva

    if (reservation) {
      const completedReservation: IReservation = {
        ...reservation,
        state: IStateBooking.ACTIVE,
        order_detail: {
          uuid: orderId,
          date: new Date(),
          room_total: room.price_per_day,
          additionals_services_total: 0,
        } as IOrderDetail,
      };

      console.log("Reserva completada:", completedReservation); // Verifica la reserva completada

      // Verificar que las propiedades existen antes de enviar
      console.log('User UUID:', currentUser.uuid); // Log del UUID del usuario
      console.log('Room UUID:', room.uuid); // Log del UUID de la habitación
      console.log('Property UUID:', room.property?.uuid); // Log del UUID de la propiedad

      try {
        const response = await fetch(`http://localhost:3000/reservations/addReservation/${currentUser.uuid}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            propertyId: room.property?.uuid, // Verifica si propertyId está definido
            roomId: room.uuid,
            userId: currentUser.uuid,
            checkin: completedReservation.checkIn.toISOString(),
            checkout: completedReservation.checkOut.toISOString(),
          }),
        });

        const responseText = await response.text();
        console.log('Respuesta del servidor:', responseText); // Log de la respuesta del servidor

        if (!response.ok) {
          throw new Error('Error al crear la reserva: ' + response.statusText);
        }

        const result = await response.json();
        console.log('Reserva creada en el backend:', result); // Log del resultado
        onReservationComplete(completedReservation);
        setPaymentCompleted(true);
      } catch (error) {
        console.error('Error al crear la reserva:', error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">Check-in</label>
          <input
            type="date"
            id="checkIn"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">Check-out</label>
          <input
            type="date"
            id="checkOut"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Reservar
        </button>
      </form>

      {reservation && !paymentCompleted && (
        <PayPalButton
          amount={room.price_per_day}
          paymentUuid={reservation.uuid} 
          onSuccess={handlePaymentSuccess}
        />
      )}

      {paymentCompleted && (
        <div className="mt-4 text-green-600">
          ¡Pago completado con éxito! Tu reserva ha sido confirmada.
        </div>
      )}
    </div>
  );
}

 

//166
/* "use client";
import React, { useContext, useEffect, useState } from 'react';
import { IOrderDetail, IReservation, IRoom, IStateBooking, IProperty } from '@/interfaces/Interfaces';
import PayPalButton from '../Paypal';
import { UserContext } from '@/context/user';

export default function ReservationForm({
  room,
  onReservationComplete,
}: {
  room: IRoom;
  onReservationComplete: (reservation: IReservation) => void;
}) {
  const { user } = useContext(UserContext);
  
  // Estados
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [reservation, setReservation] = useState<IReservation | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState<boolean>(false);
  const [property, setProperty] = useState<IProperty | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga

  // Verificación de usuario
  useEffect(() => {
    if (!user || !user.uuid) {
      return; // No proceder si no hay usuario
    }
  }, [user]);

  // Obtener la propiedad basada en el UUID de la habitación
  useEffect(() => {
    const fetchProperty = async () => {
      if (!room.property.uuid) return; // Agregar chequeo para asegurar que existe el UUID

      try {
        const response = await fetch(`http://localhost:3000/properties/${room.property.uuid}`);
        if (!response.ok) {
          throw new Error('Error al cargar la propiedad');
        }
        const fetchedProperty: IProperty = await response.json();
        setProperty(fetchedProperty);
      } catch (error) {
        console.error('Error al cargar la propiedad:', error);
      } finally {
        setLoading(false); // Termina el estado de carga
      }
    };

    fetchProperty();
  }, [room.property.uuid]); // Asegúrate de incluir el UUID de la propiedad como dependencia

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de fechas
    if (new Date(checkOut) <= new Date(checkIn)) {
      alert('La fecha de check-out debe ser posterior a la de check-in.');
      return;
    }

    if (!property) {
      alert('Error: Propiedad no cargada.');
      return;
    }

    const newReservation: IReservation = {
      uuid: crypto.randomUUID(),
      state: IStateBooking.PENDING,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      user: { ...user },
      room: {
        ...room,
        property: property, // Asignar la propiedad cargada
      },
      order_detail: {} as IOrderDetail,
    };

    setReservation(newReservation);
  };

  const handlePaymentSuccess = async (orderId: string) => {
    if (reservation) {
      const completedReservation: IReservation = {
        ...reservation,
        state: IStateBooking.ACTIVE,
        order_detail: {
          uuid: orderId,
          date: new Date(),
          room_total: room.price_per_day,
          additionals_services_total: 0,
        } as IOrderDetail,
      };

      try {
        const response = await fetch(`http://localhost:3000/reservations/addReservation/${user.uuid}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            propertyId: room.property.uuid,
            roomId: room.uuid,
            userId: user.uuid,
            checkin: completedReservation.checkIn.toISOString(),
            checkout: completedReservation.checkOut.toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error('Error al crear la reserva: ' + response.statusText);
        }

        const result = await response.json();
        console.log(result); // Usa la variable result
        onReservationComplete(completedReservation);
        setPaymentCompleted(true);
      } catch (error) {
        console.error('Error al crear la reserva:', error);
      }
    }
  };

  // Renderizado
  if (loading) {
    return <div>Cargando...</div>; // Componente de carga
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
            Check-in
          </label>
          <input
            type="date"
            id="checkIn"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">
            Check-out
          </label>
          <input
            type="date"
            id="checkOut"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Reservar
        </button>
      </form>

      {reservation && !paymentCompleted && (
        <PayPalButton
          amount={room.price_per_day}
          paymentUuid={reservation.uuid}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {paymentCompleted && (
        <div className="mt-4 text-green-600">
          ¡Pago completado con éxito! Tu reserva ha sido confirmada.
        </div>
      )}
    </div>
  );
}
 */