// "use client"

// import { UserContext } from '@/context/user';
// import { validateSignupField } from '@/utils/validation';
// import { useRouter } from 'next/navigation';
// import React, { useContext, useState } from 'react'

// export default function SignupForm() {
//   const router = useRouter();
//   const { signUp } = useContext(UserContext);

//   const [signupValues, setSignupValues] = useState({
//     user_name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     firstName: "",
//     lastName: "",
//     birthday: "",
//     phone: "",
//     address: "",
//     country: ""
//   });

//   const [errors, setErrors] = useState({} as { [key: string]: string });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     // Actualiza los valores del formulario
//     setSignupValues({ ...signupValues, [name]: value });

//     // Valida solo el campo que está siendo modificado
//     const fieldError = validateSignupField(name, value);

//     // Actualiza los errores para el campo específico
//     setErrors({ ...errors, [name]: fieldError });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Validación de contraseña
//     if (signupValues.password !== signupValues.confirmPassword) {
//       setErrors({ ...errors, confirmPassword: "Las contraseñas no coinciden." });
//       return;
//     }

//     // Formatear la fecha de nacimiento
//     const formattedBirthday = new Date(signupValues.birthday).toISOString().split('T')[0]; // 'YYYY-MM-DD'

//     const user = {
//       firstName: signupValues.firstName,
//       lastName: signupValues.lastName,
//       user_name: signupValues.user_name,
//       email: signupValues.email,
//       birthday: formattedBirthday,
//       password: signupValues.password,
//       confirmPasword:signupValues.confirmPassword,
//       phone: signupValues.phone,
//       address: signupValues.address,
//       country: signupValues.country,
//     };

//     const success = await signUp(user);
//     if (success) router.push("/auth-signin");
//     else alert("Invalid user");
//   };

//   return (
//     <form className='max-w-md mx-auto p-6 rounded-lg shadow-md' onSubmit={handleSubmit}>
//       <div className='relative z-0 w-full mb-5 group'>
//         <input 
//           type='email'
//           name='email'
//           id='email' 
//           className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0
//             border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//             focus:border-third-color peer'
//           placeholder=' '
//           onChange={handleChange}
//           required
//         />
//         <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                            duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                            origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                            rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//           Correo Electrónico
//         </label>
//         {errors.email && (
//           <span className='text-red-500 text-xs italic flex justify-end'>{errors.email}</span>
//         )}
//       </div>

//       <div className='relative z-0 w-full mb-5 group'>
//         <input 
//           type='password'
//           name='password'
//           id='password' 
//           className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
//                      border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//                      focus:border-third-color peer'
//           placeholder=' '
//           onChange={handleChange}
//           required
//         />
//         <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                            duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                            origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                            rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//           Contraseña
//         </label>
//         {errors.password && (
//           <span className='text-red-500 text-xs flex justify-end'>{errors.password}</span>
//         )}
//       </div>

//       <div className='relative z-0 w-full mb-5 group'>
//         <input 
//           type='password'
//           name='confirmPassword'
//           id='confirmPassword' 
//           className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
//                      border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//                      focus:border-third-color peer'
//           placeholder=' '
//           onChange={handleChange}
//           required
//         />
//         <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                            duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                            origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                            rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//           Confirme contraseña
//         </label>
//         {errors.confirmPassword && (
//           <span className='text-red-500 text-xs flex justify-end'>{errors.confirmPassword}</span>
//         )}
//       </div>

//       <div className='grid md:grid-cols-2 md:gap-6'>
//         <div className='relative z-0 w-full mb-5 group'>
//           <input 
//             type='text'
//             name='firstName'
//             id='firstName' 
//             className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
//             border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//             focus:border-third-color peer'
//             placeholder=' '
//             onChange={handleChange}
//             required
//           />
//           <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                             duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                             origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                             rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                             peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//             Primer nombre
//           </label>
//           {errors.firstName && (
//             <span className='text-red-500 text-xs flex justify-end'>{errors.firstName}</span>
//           )}
//         </div>

//         <div className='relative z-0 w-full mb-5 group'>
//           <input 
//             type='text'
//             name='lastName'
//             id='lastName' 
//             className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
//             border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//             focus:border-third-color peer'
//             placeholder=' '
//             onChange={handleChange}
//             required
//           />
//           <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                             duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                             origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                             rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                             peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//             Apellido
//           </label>
//           {errors.lastName && (
//             <span className='text-red-500 text-xs flex justify-end'>{errors.lastName}</span>
//           )}
//         </div>
//       </div>

//       <div className='relative z-0 w-full mb-5 group'>
//         <input 
//           type='text'
//           name='user_name'
//           id='user_name' 
//           className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
//           border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//           focus:border-third-color peer'
//           placeholder=' '
//           onChange={handleChange}
//           required
//         />
//         <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                           duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                           origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                           rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                           peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//           Nombre de Usuario
//         </label>
//         {errors.user_name && (
//           <span className='text-red-500 text-xs flex justify-end'>{errors.user_name}</span>
//         )}
//       </div>

//       <div className='relative z-0 w-full mb-5 group'>
//         <input 
//           type='date'
//           name='birthday'
//           id='birthday' 
//           className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
//           border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//           focus:border-third-color peer'
//           placeholder=' '
//           onChange={handleChange}
//           required
//         />
//         <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                           duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                           origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                           rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                           peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//           Fecha de Nacimiento
//         </label>
//         {errors.birthday && (
//           <span className='text-red-500 text-xs flex justify-end'>{errors.birthday}</span>
//         )}
//       </div>

//       <div className='relative z-0 w-full mb-5 group'>
//         <input 
//           type='text'
//           name='phone'
//           id='phone' 
//           className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
//           border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//           focus:border-third-color peer'
//           placeholder=' '
//           onChange={handleChange}
//           required
//         />
//         <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                           duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                           origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                           rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                           peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//           Teléfono
//         </label>
//         {errors.phone && (
//           <span className='text-red-500 text-xs flex justify-end'>{errors.phone}</span>
//         )}
//       </div>

//       <div className='relative z-0 w-full mb-5 group'>
//         <input 
//           type='text'
//           name='address'
//           id='address' 
//           className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
//           border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//           focus:border-third-color peer'
//           placeholder=' '
//           onChange={handleChange}
//           required
//         />
//         <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                           duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                           origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                           rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                           peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//           Dirección
//         </label>
//         {errors.address && (
//           <span className='text-red-500 text-xs flex justify-end'>{errors.address}</span>
//         )}
//       </div>

//       <div className='relative z-0 w-full mb-5 group'>
//         <input 
//           type='text'
//           name='country'
//           id='country' 
//           className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
//           border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//           focus:border-third-color peer'
//           placeholder=' '
//           onChange={handleChange}
//           required
//         />
//         <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                           duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                           origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                           rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                           peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//           País
//         </label>
//         {errors.country && (
//           <span className='text-red-500 text-xs flex justify-end'>{errors.country}</span>
//         )}
//       </div>

//       <button
//         type='submit'
//         className='mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>
//         Registrarse
//       </button>
//     </form>
//   );
// }

'use client';

import { useState, useContext } from 'react';
import { Button, Input, FormControl, FormLabel, Progress, Select, Box, Text, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Mail, Lock, User, Calendar, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { UserContext } from '@/context/user'; // Ajusta la ruta según la ubicación de tu contexto
import { useRouter } from 'next/navigation';

export default function InstaStayRegistro() {
  const router = useRouter();
  const { signUp} = useContext(UserContext); // Usamos el contexto para registrar usuarios

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    user_name: '',
    birthday: '',
    phone: '',
    address: '',
    country: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    const userData = {
      user_name: formData.user_name,  // Cambia `username` a `user_name`
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName, // Asegúrate de que este campo sea necesario o remuévelo
      lastName: formData.lastName,     // Lo mismo para este campo
      birthday: formData.birthday,    // Cambia `birthDate` a `birthday`
      phone: formData.phone,
      address: formData.address,
      country: formData.country
    };
  
    try {
      await signUp(userData); 
      router.push("/auth-signin");
      setError('');
      
    } catch  {
      setError('Error al registrar usuario'); // Maneja errores de registro
    }
  };

  const calculateProgress = () => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(value => value !== '').length;
    return (filledFields / totalFields) * 100;
  };

  return (
    <Box className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Box className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl transform transition-all hover:scale-105 duration-300">
        <Box>
          <Text fontSize="4xl" fontWeight="bold" textAlign="center" color="#4D8DA1" mb={6}>InstaStay</Text>
          <Text mt={6} textAlign="center" fontSize="3xl" fontWeight="extrabold" color="gray.900">
            Registro de Usuario
          </Text>
          <Box mt={4}>
            <Progress value={calculateProgress()} />
          </Box>
        </Box>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Box className="grid grid-cols-1 gap-6">
            <FormControl>
              <FormLabel htmlFor="email" srOnly>Correo Electrónico</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Mail className="text-gray-400" />
                </InputLeftElement>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Correo Electrónico"
                  value={formData.email}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password" srOnly>Contraseña</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Lock className="text-gray-400" />
                </InputLeftElement>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="confirmPassword" srOnly>Confirmar Contraseña</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Lock className="text-gray-400" />
                </InputLeftElement>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="Confirmar Contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="firstName" srOnly>Primer Nombre</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <User className="text-gray-400" />
                </InputLeftElement>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  placeholder="Primer Nombre"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lastName" srOnly>Apellido</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <User className="text-gray-400" />
                </InputLeftElement>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  placeholder="Apellido"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="user_name"  srOnly>Nombre de Usuario</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <User className="text-gray-400" />
                </InputLeftElement>
                <Input
                  id="user_name"
                  name="user_name"
                  type="text"
                  autoComplete="user_name"
                  required
                  placeholder="Nombre de Usuario"
                  value={formData.user_name}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="birthday" srOnly>Fecha de Nacimiento</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Calendar className="text-gray-400" />
                </InputLeftElement>
                <Input
                  id="birthday"
                  name="birthday"
                  type="date"
                  required
                  value={formData.birthday}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="phone" srOnly>Teléfono</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Phone className="text-gray-400" />
                </InputLeftElement>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="address" srOnly>Dirección</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MapPin className="text-gray-400" />
                </InputLeftElement>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="street-address"
                  required
                  placeholder="Dirección"
                  value={formData.address}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="country" srOnly>País</FormLabel>
              <InputGroup>
                <Select
                  id="country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="">Selecciona un país</option>
                  <option value="ES">España</option>
                  <option value="MX">México</option>
                  <option value="AR">Argentina</option>
                  <option value="CO">Colombia</option>
                  <option value="PE">Perú</option>
                </Select>
              </InputGroup>
            </FormControl>
          </Box>

          {error && (
            <Text color="red.500" fontSize="sm" mt={2} bg="red.100" borderWidth={1} borderColor="red.400" borderRadius="md" p={2}>
              {error}
            </Text>
          )}

          <Button
            type="submit"
            className="w-full"
            colorScheme="blue"
          >
            Registrarse
          </Button>
        </form>
        <Box textAlign="center" mt={4
}> <Text fontSize="sm" color="gray.600"> ¿Ya tienes una cuenta?{' '} <Link href="/auth-signin" className="font-medium text-sky-600 hover:text-sky-500"> Inicia sesión </Link> </Text> </Box> </Box> </Box> ); }