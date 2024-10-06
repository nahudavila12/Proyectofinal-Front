import React, { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '../../context/user';
import { IReservation } from '@/interfaces/Interfaces';
import Image from 'next/image'; 

const Profile: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const [reservations, setReservations] = useState<IReservation[]>([]);


  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const fetchReservations = useCallback(async () => {
    if (!user) return;

    try {
      const response = await fetch(`/api/reservations/user/${user.user?.uuid}`); 
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  }, [user]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');

    if (confirmDelete) {
      try {
        await fetch(`/api/users/delete/${user?.user?.uuid}`, {
          method: 'DELETE',
        });
        setUser(null); 
        alert('Cuenta eliminada con éxito.');
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  const handleEditPassword = async (e: React.FormEvent) => {
    e.preventDefault(); 


    if (!currentPassword || !newPassword) {
      alert('Por favor, completa ambos campos.');
      return;
    }

    try {
      const response = await fetch(`/api/users/change-password/${user?.user?.uuid}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        throw new Error('Error al cambiar la contraseña');
      }

      alert('Contraseña cambiada con éxito.');
      setShowPasswordForm(false); 

      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Error al cambiar la contraseña. Asegúrate de que la contraseña actual sea correcta.');
    }
  };

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {

      const formData = new FormData();
      formData.append('profileImage', file);

      try {
        const response = await fetch(`/api/users/upload-image/${user?.user?.uuid}`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Error al subir la imagen');
        }

        alert('Imagen de perfil actualizada con éxito.');
      } catch (error) {
        console.error('Error uploading profile image:', error);
      }
    }
  };

  return (
    <div className="profile-container">
      <h1 className="text-2xl font-bold">{user?.user?.firstName}</h1>
      
      {user?.user?.profile?.userIMG ? (
        <Image
          src={user.user.profile.userIMG}
          alt="Profile"
          width={96}
          height={96}
          className="rounded-full"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
          <span>No hay imagen de perfil</span>
        </div>
      )}

      <h2 className="text-xl mt-4">Actualizar Imagen de Perfil</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleProfileImageUpload}
        className="mt-2 border p-1 rounded"
      />
      
      <h2 className="text-xl mt-4">Reservas</h2>
      {reservations.length > 0 ? (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.uuid} className="border p-2 my-2">
              <p>Check-in: {new Date(reservation.checkIn).toLocaleDateString()}</p>
              <p>Check-out: {new Date(reservation.checkOut).toLocaleDateString()}</p>
              <p>Estado: {reservation.state}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes reservas.</p>
      )}

      <button onClick={handleDeleteAccount} className="mt-4 bg-red-500 text-white p-2 rounded">
        Eliminar Cuenta
      </button>
      <button 
        onClick={() => setShowPasswordForm(!showPasswordForm)} 
        className="mt-2 bg-blue-500 text-white p-2 rounded"
      >
        {showPasswordForm ? 'Cancelar' : 'Editar Contraseña'}
      </button>

      {showPasswordForm && (
        <form onSubmit={handleEditPassword} className="mt-4">
          <div>
            <label htmlFor="currentPassword">Contraseña Actual</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="border rounded p-1"
              required
            />
          </div>
          <div className="mt-2">
            <label htmlFor="newPassword">Nueva Contraseña</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border rounded p-1"
              required
            />
          </div>
          <button type="submit" className="mt-4 bg-green-500 text-white p-2 rounded">
            Cambiar Contraseña
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
