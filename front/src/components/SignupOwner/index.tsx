// "use client"




// import { UserContext } from '@/context/user';
// import { validateSignupField } from '@/utils/validation';
// import { useRouter } from 'next/navigation';
// import React, { useContext, useState } from 'react'




// export default function SignupFormOwner() {

//   const router = useRouter()
//   const { signUp, signUpOwner } = useContext(UserContext)
  

//   const [signupValues, setSignupValues] = useState ({
//     bussines_name: "",
//     bussinesId: "",
//     email: "",
//     phone: "",
//     uuid: "",
//     user_name:"",
//     password: "",
//     confirmPassword:"",
//     firstName: "",
//     lastName: "",
//     birthday: "",
//     address: "",
//     country: ""
//   })
  
//   const [errors, setErrors] = useState({} as {[key: string]: string});

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     // Actualiza los valores del formulario
//     setSignupValues({ ...signupValues, [name]: value });

//     // Valida solo el campo que está siendo modificado
//     const fieldError = validateSignupField(name, value);

//     // Actualiza los errores para el campo específico
//     setErrors({ ...errors, [name]: fieldError });
// };

// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
  
//   if (signupValues.password !== signupValues.confirmPassword) {
//     setErrors({ ...errors, confirmPassword: "Las contraseñas no coinciden." });
//     return;
//   }
//   const formattedBirthday = new Date(signupValues.birthday).toISOString().split('T')[0];
//   // Crea un objeto que solo contenga los campos que realmente necesitas
//   const user = {
//     email: signupValues.email,
//     phone: signupValues.phone,
//     firstName: signupValues.firstName,
//     lastName: signupValues.lastName,
//     user_name: signupValues.user_name,
//     birthday:  formattedBirthday,
//     password: signupValues.password,
//     confirmPassword:signupValues.confirmPassword,
//     address: signupValues.address,
//     country:signupValues.country,
//   };
//   const success = await signUp(user);
  
//   if (success) {
//     const uuid = success.uuid; // Asegúrate de que la respuesta incluya el UUID
//     const ownerData = {
//         bussines_name: signupValues.bussines_name, // Puedes agregar un campo para que el usuario ingrese esto
//         bussinesId: signupValues.bussinesId, // Puedes agregar un campo para que el usuario ingrese esto también
//         email: signupValues.email,
//         phone: signupValues.phone,
//     };

//     const ownerSuccess = await signUpOwner(uuid, ownerData);
//     if (ownerSuccess) {
//         router.push("/auth-signin");
//     } else {
//         alert("Error al crear el propietario.");
//     }
// } else {
//     alert("Invalid user");
// }
// };




  
//   return (
//     <form className='max-w-md mx-auto p-6 rounded-lg shadow-md' onSubmit={handleSubmit}>
//          <div className='grid md:grid-cols-2 md:gap-6'>
//               <div className='relative z-0 w-full mb-5 group'>
//               <input 
//                   type='text'
//                   name='bussines_name'
//                   id='bussines_name' 
//                   className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
//                   border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//                   focus:border-third-color peer'
//                   placeholder=' '
//                   onChange={handleChange}
//                   required
//                   />
//               <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                                 duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                                 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                                 rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                                 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//                       Nombre de Empresa o Propietario
//               </label>
//               {/* {errors.first_name && (
//                 <span className='text-red-500 text-xs flex justify-end'>{errors.first_name}</span>
//                 )}      */}
//               </div>
//         </div>
//           <div className='relative z-0 w-full mb-5 group'>
//               <input 
//                   type='text'
//                   name='bussinesId'
//                   id='bussinesId' 
//                   className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
//                   border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//                   focus:border-third-color peer'
//                   placeholder=' '
//                   onChange={handleChange}
//                   required
//                   />
//               <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                                 duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                                 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                                 rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                                 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//                       Nit de empresa/Propietario
//               </label>
//               {/* {errors.first_name && (
//                 <span className='text-red-500 text-xs flex justify-end'>{errors.first_name}</span>
//                 )}      */}
//               </div>

//      <div className='relative z-0 w-full mb-5 group'>
//         <input 
//            type='email'
//            name='email'
//            id='email' 
//            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0
//            border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//            focus:border-third-color peer'
//            placeholder=' '
//            onChange={handleChange}
//            required
//            />
//         <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                           duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                           origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                           rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                           peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//                Correo Electrónico
//         </label>
//         {errors.email && (
//           <span className='text-red-500 text-xs italic flex justify-end'>{errors.email}</span>
//          )}
       
//      </div>


//      <div className='relative z-0 w-full mb-5 group'>
//         <input 
//            type='password'
//            name='password'
//            id='password' 
//            className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
//                       border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//                       focus:border-third-color peer'
//            placeholder=' '
//            onChange={handleChange}
//            required
//          />
//           <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                           duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                           origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                           rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                           peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//                Contraseña
//         </label>
//         {errors.password && (
//            <span className='text-red-500 text-xs flex justify-end'>{errors.password}</span>
//         )}
//      </div>
//      <div className='relative z-0 w-full mb-5 group'>
//         <input 
//            type='password'
//            name='confirmPassword'
//            id='confirmPassword' 
//            className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
//                       border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//                       focus:border-third-color peer'
//            placeholder=' '
//            onChange={handleChange}
//            required
//          />
//           <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                           duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                           origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                           rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                           peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//                Confirme contraseña
//         </label>
//         {errors.confirmPassword && (
//            <span className='text-red-500 text-xs flex justify-end'>{errors.confirmPassword}</span>
//         )}
//      </div>
         
//         <div className='grid md:grid-cols-2 md:gap-6'>
//              <div className='relative z-0 w-full mb-5 group'>
//              <input 
//                  type='text'
//                  name='firstName'
//                  id='firstName' 
//                  className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
//                  border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//                  focus:border-third-color peer'
//                  placeholder=' '
//                  onChange={handleChange}
//                  required
//                  />
//              <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                                duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                                origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                                rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                                peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//                      Primer nombre
//              </label>
//              {errors.first_name && (
//                <span className='text-red-500 text-xs flex justify-end'>{errors.first_name}</span>
//                )}     
//              </div>

//              <div className='relative z-0 w-full mb-5 group'>
//              <input 
//                  type='text'
//                  name='lastName'
//                  id='lastName' 
//                  className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
//                  border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//                  focus:border-third-color peer'
//                  placeholder=' '
//                  onChange={handleChange}
//                  required
//                  />
//              <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                                duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                                origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                                rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                                peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//                      Apellido
//              </label>
//              {errors.last_name && (
//                <span className='text-red-500 text-xs flex justify-end'>{errors.last_name}</span>
//                )}     
//              </div>
//          </div>
//          <div className='relative z-0 w-full mb-5 group'>
//              <input 
//                  type='text'
//                  name='user_name'
//                  id='user_name' 
//                  className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
//                  border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//                  focus:border-third-color peer'
//                  placeholder=' '
//                  onChange={handleChange}
//                  required
//                  />
//              <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                                duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                                origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                                rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                                peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//                      Nombre de usuario
//              </label>
//              {errors.first_name && (
//                <span className='text-red-500 text-xs flex justify-end'>{errors.first_name}</span>
//                )}     
//              </div>
//          <div className='relative z-0 w-full mb-5 group'>
//         <input 
//            type='date'
//            name='birthday'
//            id='birthday' 
//            className='block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0
//            border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//            focus:border-third-color peer'
//            placeholder=' '
//            onChange={handleChange}
//            required
//            />
//         <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                           duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                           origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                           rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                           peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//                Fecha de nacimiento
//         </label>
//         {errors.birthday && (
//           <span className='text-red-500 text-xs italic flex justify-end'>{errors.birthday}</span>
//          )}
       
//      </div>
//          <div className='grid md:grid-cols-2 md:gap-6'>
//              <div className='relative z-0 w-full mb-5 group'>
//              <input 
//                  type='tel'
//                  name='phone'
//                  id='phone' 
//                  className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
//                  border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//                  focus:border-third-color peer'
//                  placeholder=' '
//                  onChange={handleChange}
//                  required
//                  />
//              <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                                duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                                origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                                rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                                peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//                      Número de celular
//              </label>
//              {errors.phone && (
//                <span className='text-red-500 text-xs flex justify-end'>{errors.phone}</span>
//                )}     
//              </div>

//              <div className='relative z-0 w-full mb-5 group'>
//              <input 
//                  type='text'
//                  name='address'
//                  id='address' 
//                  className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
//                  border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//                  focus:border-third-color peer'
//                  placeholder=' '
//                  onChange={handleChange}
//                  required
//                  />
//              <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                                duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                                origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                                rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                                peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//                      Dirección
//              </label>
//              {errors.address && (
//                <span className='text-red-500 text-xs flex justify-end'>{errors.address}</span>
//                )}     
//              </div>
//              <div className='relative z-0 w-full mb-5 group'>
//              <input 
//                  type='text'
//                  name='country'
//                  id='country' 
//                  className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
//                  border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
//                  focus:border-third-color peer'
//                  placeholder=' '
//                  onChange={handleChange}
//                  required
//                  />
//              <label className='peer-focus:font-medium absolute text-sm text-gray-500 
//                                duration-300 transform -translate-y-6 scale-75 top-5 -z-10
//                                origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
//                                rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
//                                peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
//                      País
//              </label>
//              {errors.country && (
//                <span className='text-red-500 text-xs flex justify-end'>{errors.country}</span>
//                )}     
//              </div>
//          </div>
//          <button 
//             type='submit'
//            //  disabled={Object.keys(errors).length > 0}
//             disabled={Object.keys(errors).some((key) => errors[key])}
//             className='block w-full text-center text-white bg-second-color hover:bg-third-color font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-third-color'
//          >
//            Registrarse
//          </button>
//    </form>
//   )
// }

'use client';

import { useState, useContext } from 'react';
import { Button, Input, FormControl, FormLabel, Progress, Select, Box, Text, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Mail, Lock, User, Calendar, Phone, MapPin, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { UserContext } from '@/context/user';
import { useRouter } from 'next/navigation';


export default function SignupOwner() {
  const router = useRouter();
  const { signUpOwner, signUp } = useContext(UserContext); // Asumimos que `signUpOwner` es la función para registrar propietarios

  // Estado para el formulario del propietario con campos adicionales
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    birthday: '',
    phone: '',
    address: '',
    country: '',
    bussines_name: '', // Nombre del negocio
    bussinesId: ''     // ID de negocio
  });

  const [error, setError] = useState('');

  // Manejo de cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Función de envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
  
    const formattedBirthday = new Date(formData.birthday).toISOString().split('T')[0];
  
    const user = {
      email: formData.email,
      phone: formData.phone,
      firstName: formData.firstName,
      lastName: formData.lastName,
      user_name: formData.user_name,
      birthday: formattedBirthday,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      address: formData.address,
      country: formData.country,
    };
  
    const success = await signUp(user);
    console.log("Resultado de signUp:", success); // Verifica el resultado de signUp
  
    if (success) {
      const uuid = success.uuid; // Asegúrate de que la respuesta incluya el UUID
      console.log("UUID del usuario:", uuid); // Verifica el UUID
  
      const ownerData = {
        bussines_name: formData.bussines_name,
        bussinesId: formData.bussinesId,
        email: formData.email,
        phone: formData.phone,
      };
  
      const ownerSuccess = await signUpOwner(uuid, ownerData);
      console.log("Resultado de signUpOwner:", ownerSuccess); // Agrega esto para verificar el resultado de signUpOwner
      
      if (ownerSuccess) {
        router.push("/auth-signin");
      } else {
        alert("Error al crear el propietario.");
      }
    } else {
      alert("Error al crear el usuario.");
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
            Registro de Propietario
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

            {/* Contraseña y Confirmación */}
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

            {/* Otros campos */}
            <FormControl>
              <FormLabel htmlFor="user_name" srOnly>Nombre de Usuario</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <User className="text-gray-400" />
                </InputLeftElement>
                <Input
                  id="user_name"
                  name="user_name"
                  type="text"
                  required
                  placeholder="Nombre de Usuario"
                  value={formData.user_name}
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
                  required
                  placeholder="Apellido"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>

            {/* Fecha de Nacimiento */}
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
                  value={formData.birthday}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>

            {/* Campos adicionales del propietario */}
            <FormControl>
              <FormLabel htmlFor="bussines_name" srOnly>Nombre del Negocio</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Briefcase className="text-gray-400" />
                </InputLeftElement>
                <Input
                  id="bussines_name"
                  name="bussines_name"
                  type="text"
                  required
                  placeholder="Nombre del Negocio"
                  value={formData.bussines_name}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="bussinesId" srOnly>ID del Negocio</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <User className="text-gray-400" />
                </InputLeftElement>
                <Input
                  id="bussinesId"
                  name="bussinesId"
                  type="text"
                  required
                  placeholder="ID del Negocio"
                  value={formData.bussinesId}
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
                  type="text"
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

          {/* Botón de registro */}
          <Box className="flex items-center justify-between mt-6">
            <Button type="submit" colorScheme="teal" className="w-full">
              Registrar como Propietario
            </Button>
          </Box>

          {/* Enlace para regresar al inicio de sesión */}
          <Box mt={4} textAlign="center">
            <Text>
              ¿Ya tienes cuenta?{' '}
              <Link href="/auth-signin" className="text-teal-600 font-bold">
                Iniciar Sesión
              </Link>
            </Text>
          </Box>
          {error && <Text color="red.500">{error}</Text>}
        </form>
      </Box>
    </Box>
  );
}