import { IReservation } from '@/interfaces/Interfaces';
import React, { useEffect, useState } from 'react';


const ReservationsSection: React.FC = () => {
  const [reservations, setReservations] = useState<IReservation[]>([]);

  useEffect(() => {
    fetch('/api/reservations')
      .then((res) => res.json())
      .then((data) => setReservations(data))
      .catch((error) => console.error('Error fetching reservations:', error));
  }, []);

  return (
    <div className="bg-white p-6 rounded-md shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Reservas</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border-b-2 pb-2">Usuario</th>
            <th className="border-b-2 pb-2">Check-in</th>
            <th className="border-b-2 pb-2">Check-out</th>
            <th className="border-b-2 pb-2">Estado</th>
            <th className="border-b-2 pb-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.uuid}>
              <td className="py-2">{`${reservation.user.firstName} ${reservation.user.lastName}`}</td>
              <td className="py-2">{new Date(reservation.checkIn).toLocaleDateString()}</td>
              <td className="py-2">{new Date(reservation.checkOut).toLocaleDateString()}</td>
              <td className="py-2">{reservation.state}</td>
              <td className="py-2">
                <button className="bg-green-500 text-white px-4 py-1 rounded mr-2">Actualizar</button>
                <button className="bg-red-500 text-white px-4 py-1 rounded">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsSection;
