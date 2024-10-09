'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import Image from 'next/image';

export default function GoogleSignInButton() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg shadow-md">
      <div className="flex flex-col items-center mb-0">
        <Image
          src="/google.png"
          alt="Google Logo"
          width={50}
          height={50}
          className="mb-4"
        />
      </div>

      <div className="space-y-4">
        {user ? (
          <div className="text-center">
            <p>Bienvenido {user.name}!</p>
            <Link 
              href="/api/auth/logout" 
              className="block w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              Cerrar sesión
            </Link>
          </div>
        ) : (
          <Link 
            href="/api/home" 
            className="block w-full text-center text-white bg-second-color hover:bg-third-color font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-third-color"
          >
            Iniciar sesión con Google
          </Link>
        )}
      </div>
    </div>
  );
}