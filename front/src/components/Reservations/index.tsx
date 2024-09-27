import { IOrderDetail, IReservation, IRoom, IStateBooking, IUser } from '@/interfaces/Interfaces';
import React, { useState } from 'react';


interface ReservationFormProps {
  room: IRoom;
  onReservationComplete: (reservation: IReservation) => void;
}

export default function ReservationForm({ room, onReservationComplete }: ReservationFormProps) {
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const reservation: IReservation = {
      uuid: crypto.randomUUID(),
      state: IStateBooking.PENDING,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      user: {} as IUser, // Esto debería ser el usuario actual
      room: room,
      order_detail: {} as IOrderDetail, // Esto se llenará más tarde
    };

    onReservationComplete(reservation);
  };

  return (
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
  );
}