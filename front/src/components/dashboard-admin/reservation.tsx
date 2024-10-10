import { IReservation } from '@/interfaces/Interfaces';
import React, { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react'; 

const ReservationsSection: React.FC = () => {
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch('http://localhost:3000/admin/reservation/all');
        if (!res.ok) {
          throw new Error('Error al obtener las reservas');
        }
        const data = await res.json();
        setReservations(data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setError('No se pudo cargar la información de reservas.');
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-6">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-800 p-4 rounded-md shadow-md mt-6">
        {error}
      </div>
    );
  }

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
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <tr key={reservation.uuid}>
                <td className="py-2">{`${reservation?.user?.firstName ?? 'N/A'} ${reservation?.user?.lastName ?? 'N/A'}`}</td>
                <td className="py-2">{new Date(reservation.checkIn).toLocaleDateString()}</td>
                <td className="py-2">{new Date(reservation.checkOut).toLocaleDateString()}</td>
                <td className="py-2">{reservation.state}</td>
                <td className="py-2">
                  <button className="bg-green-500 text-white px-4 py-1 rounded mr-2">Actualizar</button>
                  <button className="bg-red-500 text-white px-4 py-1 rounded">Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4">No hay reservas disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsSection;
