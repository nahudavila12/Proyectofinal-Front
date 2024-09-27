'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  // Verificamos que user y user.picture existan
  const userPicture = user?.picture || ''; // Asigna una cadena vacía si es undefined
  const userName = user?.name || 'Usuario'; // Asigna un valor por defecto si es undefined

  return (
    user && (
      <div className='p-4 text-white' >
        {userPicture && ( // Solo renderiza la imagen si userPicture no es una cadena vacía
          <Image 
            src={userPicture} 
            alt={userName} // Asegúrate de que userName sea un string válido
            width={50} // Ajusta el ancho según lo necesites
            height={50}
            className='rounded-3xl' // Ajusta la altura según lo necesites
          />
        )}
        <h4>{userName}</h4>
        <p>{user?.email}</p>
      </div>
    )
  );
}