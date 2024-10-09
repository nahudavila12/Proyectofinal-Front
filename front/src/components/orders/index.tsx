/* import { IOrderDetail, IReservation, IState } from '@/interfaces/Interfaces';
import React from 'react';


interface OrderFormProps {
  reservation: IReservation;
  onOrderComplete: (orderDetail: IOrderDetail) => void;
}

export default function OrderForm({ reservation, onOrderComplete }: OrderFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderDetail: IOrderDetail = {
      uuid: crypto.randomUUID(),
      date: new Date(),
      room_total: reservation.room.price_per_day * (reservation.checkOut.getTime() - reservation.checkIn.getTime()) / (1000 * 3600 * 24),
      additionals_services_total: 0, // Esto podría calcularse si tienes servicios adicionales
      total: reservation.room.price_per_day * (reservation.checkOut.getTime() - reservation.checkIn.getTime()) / (1000 * 3600 * 24),
      payment: {
        uuid: crypto.randomUUID(),
        date: new Date(),
        state: IState.Pending,
        method: 'PayPal',
        orderDetail: {} as IOrderDetail, // Esto se llenará más tarde
      },
      user: reservation.user,
      reservation: reservation,
    };

    onOrderComplete(orderDetail);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">Resumen de la orden</h2>
        <p>Check-in: {reservation.checkIn.toLocaleDateString()}</p>
        <p>Check-out: {reservation.checkOut.toLocaleDateString()}</p>
        <p>Habitación: {reservation.room.room_number}</p>
        <p>Precio por noche: ${reservation.room.price_per_day}</p>
        <p>Total: ${reservation.room.price_per_day * (reservation.checkOut.getTime() - reservation.checkIn.getTime()) / (1000 * 3600 * 24)}</p>
      </div>
      <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Proceder al pago
      </button>
    </form>
  );
} */

  import { IOrderDetail, IReservation, IState } from '@/interfaces/Interfaces';
import React from 'react';

interface OrderFormProps {
  reservation: IReservation;
  onOrderComplete: (orderDetail: IOrderDetail) => void;
}

export default function OrderForm({ reservation, onOrderComplete }: OrderFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderDetail: IOrderDetail = {
      uuid: crypto.randomUUID(),
      date: new Date(),
      room_total: (reservation.room.price_per_day * (reservation.checkOut.getTime() - reservation.checkIn.getTime())) / (1000 * 3600 * 24),
      additionals_services_total: 0, // Esto podría calcularse si tienes servicios adicionales
      total: (reservation.room.price_per_day * (reservation.checkOut.getTime() - reservation.checkIn.getTime())) / (1000 * 3600 * 24),
      payment: {
        uuid: crypto.randomUUID(),
        date: new Date(),
        state: IState.Pending,
        method: 'PayPal',
        orderDetail: {} as IOrderDetail, // Esto se llenará más tarde
      },
      user: reservation.user,
      reservation: reservation,
    };

    onOrderComplete(orderDetail);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">Resumen de la orden</h2>
        <p>Check-in: {reservation.checkIn.toLocaleDateString()}</p>
        <p>Check-out: {reservation.checkOut.toLocaleDateString()}</p>
        <p>Habitación: {reservation.room.room_number}</p>
        <p>Precio por noche: ${reservation.room.price_per_day}</p>
        <p>Total: ${((reservation.room.price_per_day * (reservation.checkOut.getTime() - reservation.checkIn.getTime())) / (1000 * 3600 * 24)).toFixed(2)}</p>
      </div>
      <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Proceder al pago
      </button>
    </form>
  );
}
