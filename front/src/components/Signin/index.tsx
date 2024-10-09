// "use client"



// import { UserContext } from '@/context/user';
// import { validateSigninField } from '@/utils/validation';
// import { useRouter } from 'next/navigation';
// import React, { useContext, useState } from 'react'


  

// export default function SigninForm() {
    
//     const router = useRouter();

//     const {signIn} = useContext(UserContext);

//     const [errors, setErrors] = useState({} as {[key: string]: string});
  

//     const [signinValues, setSigninValues] = useState ({
//       email: "",
//       password: "",
//     })
    
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const { name, value } = e.target;
  
//       // Actualiza los valores del formulario
//       setSigninValues({ ...signinValues, [name]: value });
  
//       // Valida solo el campo específico que se está modificando
//       const fieldError = validateSigninField(name, value);
  
//       // Actualiza el estado de errores
//       setErrors({ ...errors, [name]: fieldError });
//   };
  
  
//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
      
//       const success = await signIn(signinValues);
  
//       if (success) {
//           router.push("/home"); 
//       } else {
//           alert("Invalid credentials");
//       }
//   };
  
    
//     return (
//       <form className='max-w-md mx-auto p-6 rounded-lg shadow-md' onSubmit={handleSubmit}>
//         <div className='relative z-0 w-full mb-5 group'>
//            <input 
//               type='email'
//               name='email'
//               id='email' 
//               className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
//                          border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//                          focus:border-third-color peer'
//               placeholder=' '
//               onChange={handleChange}
//               required
//             />
//            <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                              duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                              origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                              rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//                   Email address
//            </label>
//            {errors.email && (
//               <span className='text-red-500 text-xs italic flex justify-end'>{errors.email}</span>
//            )}
//         </div>
  
  
//         <div className='relative z-0 w-full mb-5 group'>
//            <input 
//               type='password'
//               name='password'
//               id='password' 
//               className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
//                          border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//                          focus:border-third-color peer'
//               placeholder=' '
//               onChange={handleChange}
//               required
//             />
//              <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                              duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                              origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                              rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//                   Password
//            </label>
//            {errors.password && (
//               <span className='text-red-500 text-xs flex justify-end'>{errors.password}</span>
//            )}
//         </div>
//         <button 
//             type='submit'
//             // disabled={Object.keys(errors).length > 0}
//             disabled={Object.keys(errors).some((key) => errors[key])}
//             className='block w-full text-center text-white bg-second-color hover:bg-third-color font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-third-color'
//         >
//           Iniciar sesión
//         </button>
//       </form>
//     )
//   }
  
'use client';

import { useState, useContext } from 'react';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Progress,
  Checkbox,
  Text,
  Box,
  Link,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { LockIcon } from '@chakra-ui/icons';
import { Mail } from 'lucide-react';
import GoogleSignInButton from '@/components/Auth0Google/GoogleSigIn'; // Asegúrate de que la ruta sea correcta
import { UserContext } from '@/context/user'; // Asegúrate de que la ruta sea correcta
import { IRol } from '@/interfaces/Interfaces';
import { useRouter } from 'next/navigation';


export default function InstaStayLogin() {
  const { signIn } = useContext(UserContext);
  const router = useRouter(); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Aquí iría la lógica de autenticación
    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    const success = await signIn(formData);
    
    if (success) {
      // Lógica para determinar el rol
      const userRole = determineUserRole(formData.email); // Cambia esto según tu lógica

      // Redirige según el rol
      if (userRole === IRol.Owner) {
        // Redirigir a la página del owner
        console.log("User is an Owner");
      } else if (userRole === IRol.Admin) {
        // Redirigir a la página del admin
        console.log("User is an Admin");
      } else {
        // Redirigir a la página normal
        console.log("User is a regular user");
      }
    } else {
      setError('Credenciales inválidas');  
    }
    if (success) {
                router.push("/home"); 
            } else {
                alert("Invalid credentials");
    }
  };

  const determineUserRole = (email: string): IRol => {
    // Aquí puedes implementar la lógica para determinar el rol del usuario
    // Por ejemplo, podrías hacer una llamada a la API para obtener el rol
    if (email.endsWith('@owner.com')) {
      return IRol.Owner;
    } else if (email.endsWith('@admin.com')) {
      return IRol.Admin;
    } else {
      return IRol.User;
    }
  };

  const calculateProgress = () => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(value => value !== '').length;
    return (filledFields / totalFields) * 100;
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Box
        maxW="md"
        w="full"
        p={10}
        bg="white"
        borderRadius="2xl"
        boxShadow="2xl"
        transition="transform 0.3s"
        _hover={{ transform: 'scale(1.05)' }}
      >
        <Text fontSize="4xl" fontWeight="bold" textAlign="center" color="#4D8DA1" mb={6}>InstaStay</Text>
        <Text mt={6} textAlign="center" fontSize="3xl" fontWeight="extrabold" color="gray.900">Iniciar Sesión</Text>
        <Progress value={calculateProgress()} size="sm" mt={4} />
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <FormControl id="email" isRequired>
            <FormLabel>Correo Electrónico</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <Mail color="gray.400" />
              </InputLeftElement>
              <Input
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                value={formData.email}
                onChange={handleChange}
                _placeholder={{ color: 'gray.400' }}
              />
            </InputGroup>
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Contraseña</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <LockIcon color="gray.400" />
              </InputLeftElement>
              <Input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                _placeholder={{ color: 'gray.400' }}
              />
            </InputGroup>
          </FormControl>

          <Checkbox defaultChecked>Recordarme</Checkbox>

          {error && (
            <Text
              color="red.500"
              fontSize="sm"
              mt={2}
              bg="red.100"
              borderWidth={1}
              borderColor="red.400"
              borderRadius="md"
              p={2}
            >
              {error}
            </Text>
          )}

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            mt={4}
            _hover={{ bgGradient: 'linear(to-r, blue.400, cyan.500)' }}
          >
            Iniciar Sesión
          </Button>
        </form>
        <Text textAlign="center" mt={4}>
          <Link color="blue.400" href="/auth-signup">¿No tienes una cuenta? Regístrate</Link>
        </Text>
        
        {/* Botón de inicio de sesión con Google */}
        <Text textAlign="center" mt={4}>O</Text>
        <GoogleSignInButton />
      </Box>
    </Box>
  );
}