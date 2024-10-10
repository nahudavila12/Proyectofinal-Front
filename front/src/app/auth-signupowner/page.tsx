
import { ChakraProvider } from '@chakra-ui/react'; // Importa ChakraProvider
import SignupFormOwner from '@/components/SignupOwner';
import React from 'react';

export default function AuthSignUpOwner() {
  return (
    <ChakraProvider>
      <div className='flex flex-col md:flex-row md:self-center min-w-full md:items-center md:justify-evenly'>
        <div className="relative w-full overflow-hidden">
          <div className="relative w-full h-[60vh]">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src="https://res.cloudinary.com/dhrys2lqz/video/upload/v1726195353/vecteezy_aerial-view-of-pink-beach-in-komodo_30468522_kqrsuk.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-first-color">
              <h1 className="self-center text-6xl font-bold playfair-display-bold">
                InstaStay
              </h1>
              <span className="text-2xl text-white w-full playfair-display-regular">
                Tu estadía, al instante.
              </span>
            </div>
          </div>
          <div className='flex-1 p-8'>
            <h2 className='text-2xl font-bold text-center'>Registro</h2>
            <SignupFormOwner />
            <p className="mt-4 text-center text-sm">
              ¿Ya tienes una cuenta? 
              <a 
                href="/auth-signin" 
                className="text-blue-500 hover:underline ml-1"
              >
                Inicia sesión.
              </a>
            </p>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}
