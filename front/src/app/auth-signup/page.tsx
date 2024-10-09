'use client';

import { ChakraProvider } from '@chakra-ui/react';
import SignupForm from '@/components/Signup';
import React from 'react';

export default function AuthSignUp() {
  return (
    <ChakraProvider>
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-sky-300 via-blue-300 to-cyan-400">
        <div className="flex-1 w-full max-w-md">
          <SignupForm />
        </div>
      </div>
    </ChakraProvider>
  );
}
