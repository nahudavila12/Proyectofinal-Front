'use client';

import { ChakraProvider } from '@chakra-ui/react';
import SigninForm from '@/components/Signin'; 
import React from 'react';

export default function AuthSignIn() {
  return (
    <ChakraProvider>
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-sky-300 via-blue-300 to-cyan-400">
        <div className="flex flex-col items-center p-8 md:flex-row md:justify-center md:space-x-10">
          <div className="flex-1 mt-8 md:mt-0 max-w-sm">
            <SigninForm /> 
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}

