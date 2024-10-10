import { IOrderDetail, IRoom, IUserResponse } from '@/interfaces/Interfaces';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserContext } from './user'; // Asegúrate de importar tu UserContext

interface IReservation {
    uuid: string;
    state: string;
    checkIn: Date;
    checkOut: Date;
    user: Partial<IUserResponse>; 
    room: IRoom; 
    order_detail: IOrderDetail; 
}

interface ReservationContextType {
    reservations: IReservation[];
    createReservation: (reservation: IReservation) => Promise<string>; // Retorna el ID de la reserva
    capturePayment: (orderId: string) => Promise<void>;
    getReservations: () => Promise<void>;
    error: string | null;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const ReservationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useContext(UserContext); 
    const [reservations, setReservations] = useState<IReservation[]>([]);
    const [error, setError] = useState<string | null>(null);

    const createReservation = async (reservation: IReservation): Promise<string> => {
        try {
            setReservations((prev) => [...prev, reservation]);
            return reservation.uuid; // Retorna el ID de la reserva (uuid)
        } catch (err) {
            setError('Error al crear la reserva');
            console.error(err);
            throw err; // Lanza el error para manejarlo en el componente
        }
    };

    const capturePayment = async (orderId: string) => {
        try {
            const response = await fetch('/api/payments/capture-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId }),
            });

            if (!response.ok) {
                throw new Error('Error al capturar el pago');
            }

            const data = await response.json();
            console.log('Pago capturado:', data);
        } catch (err) {
            setError('Error al capturar el pago');
            console.error(err);
        }
    };

    const getReservations = async () => {
        const userId = user?.uuid; 

        if (!userId) {
            setError("User ID is not available.");
            return; 
        }

        try {
            const response = await fetch(`/api/reservations/user/${userId}`);

            if (!response.ok) {
                throw new Error('Error al obtener reservas');
            }

            const fetchedReservations = await response.json();
            console.log('Reservas obtenidas:', fetchedReservations);
            
            setReservations(fetchedReservations);
        } catch (error) {
            console.error('Error en getReservations:', error);
            setError('Error al obtener reservas');
        }
    };

    return (
        <ReservationContext.Provider value={{ reservations, createReservation, capturePayment, getReservations, error }}>
            {children}
        </ReservationContext.Provider>
    );
};

export const useReservationContext = () => {
    const context = useContext(ReservationContext);
    if (!context) {
        throw new Error('useReservationContext debe ser utilizado dentro de un ReservationProvider');
    }
    return context;
};
