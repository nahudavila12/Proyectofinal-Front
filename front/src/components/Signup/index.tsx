"use client"

import { UserContext } from '@/context/user';
import { validateSignupField } from '@/utils/validation';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'

export default function SignupForm() {
  const router = useRouter();
  const { signUp } = useContext(UserContext);

  const [signupValues, setSignupValues] = useState({
    user_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    birthday: "",
    phone: "",
    address: "",
    country: ""
  });

  const [errors, setErrors] = useState({} as { [key: string]: string });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Actualiza los valores del formulario
    setSignupValues({ ...signupValues, [name]: value });

    // Valida solo el campo que está siendo modificado
    const fieldError = validateSignupField(name, value);

    // Actualiza los errores para el campo específico
    setErrors({ ...errors, [name]: fieldError });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación de contraseña
    if (signupValues.password !== signupValues.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Las contraseñas no coinciden." });
      return;
    }

    // Formatear la fecha de nacimiento
    const formattedBirthday = new Date(signupValues.birthday).toISOString().split('T')[0]; // 'YYYY-MM-DD'

    const user = {
      firstName: signupValues.firstName,
      lastName: signupValues.lastName,
      user_name: signupValues.user_name,
      email: signupValues.email,
      birthday: formattedBirthday,
      password: signupValues.password,
      confirmPasword:signupValues.confirmPassword,
      phone: signupValues.phone,
      address: signupValues.address,
      country: signupValues.country,
    };

    const success = await signUp(user);
    if (success) router.push("/auth-signin");
    else alert("Invalid user");
  };

  return (
    <form className='max-w-md mx-auto p-6 rounded-lg shadow-md' onSubmit={handleSubmit}>
      <div className='relative z-0 w-full mb-5 group'>
        <input 
          type='email'
          name='email'
          id='email' 
          className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0
            border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
            focus:border-third-color peer'
          placeholder=' '
          onChange={handleChange}
          required
        />
        <label className='peer-focus:font-medium absolute text-sm text-gray-500 
                           duration-300 transform -translate-y-6 scale-75 top-5 -z-10
                           origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                           rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
                           peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
          Correo Electrónico
        </label>
        {errors.email && (
          <span className='text-red-500 text-xs italic flex justify-end'>{errors.email}</span>
        )}
      </div>

      <div className='relative z-0 w-full mb-5 group'>
        <input 
          type='password'
          name='password'
          id='password' 
          className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
                     border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
                     focus:border-third-color peer'
          placeholder=' '
          onChange={handleChange}
          required
        />
        <label className='peer-focus:font-medium absolute text-sm text-gray-500 
                           duration-300 transform -translate-y-6 scale-75 top-5 -z-10
                           origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                           rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
                           peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
          Contraseña
        </label>
        {errors.password && (
          <span className='text-red-500 text-xs flex justify-end'>{errors.password}</span>
        )}
      </div>

      <div className='relative z-0 w-full mb-5 group'>
        <input 
          type='password'
          name='confirmPassword'
          id='confirmPassword' 
          className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
                     border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
                     focus:border-third-color peer'
          placeholder=' '
          onChange={handleChange}
          required
        />
        <label className='peer-focus:font-medium absolute text-sm text-gray-500 
                           duration-300 transform -translate-y-6 scale-75 top-5 -z-10
                           origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                           rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
                           peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
          Confirme contraseña
        </label>
        {errors.confirmPassword && (
          <span className='text-red-500 text-xs flex justify-end'>{errors.confirmPassword}</span>
        )}
      </div>

      <div className='grid md:grid-cols-2 md:gap-6'>
        <div className='relative z-0 w-full mb-5 group'>
          <input 
            type='text'
            name='firstName'
            id='firstName' 
            className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
            border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
            focus:border-third-color peer'
            placeholder=' '
            onChange={handleChange}
            required
          />
          <label className='peer-focus:font-medium absolute text-sm text-gray-500 
                            duration-300 transform -translate-y-6 scale-75 top-5 -z-10
                            origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                            rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
                            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
            Primer nombre
          </label>
          {errors.firstName && (
            <span className='text-red-500 text-xs flex justify-end'>{errors.firstName}</span>
          )}
        </div>

        <div className='relative z-0 w-full mb-5 group'>
          <input 
            type='text'
            name='lastName'
            id='lastName' 
            className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
            border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
            focus:border-third-color peer'
            placeholder=' '
            onChange={handleChange}
            required
          />
          <label className='peer-focus:font-medium absolute text-sm text-gray-500 
                            duration-300 transform -translate-y-6 scale-75 top-5 -z-10
                            origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                            rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
                            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
            Apellido
          </label>
          {errors.lastName && (
            <span className='text-red-500 text-xs flex justify-end'>{errors.lastName}</span>
          )}
        </div>
      </div>

      <div className='relative z-0 w-full mb-5 group'>
        <input 
          type='text'
          name='user_name'
          id='user_name' 
          className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
          border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
          focus:border-third-color peer'
          placeholder=' '
          onChange={handleChange}
          required
        />
        <label className='peer-focus:font-medium absolute text-sm text-gray-500 
                          duration-300 transform -translate-y-6 scale-75 top-5 -z-10
                          origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                          rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
                          peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
          Nombre de Usuario
        </label>
        {errors.user_name && (
          <span className='text-red-500 text-xs flex justify-end'>{errors.user_name}</span>
        )}
      </div>

      <div className='relative z-0 w-full mb-5 group'>
        <input 
          type='date'
          name='birthday'
          id='birthday' 
          className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
          border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
          focus:border-third-color peer'
          placeholder=' '
          onChange={handleChange}
          required
        />
        <label className='peer-focus:font-medium absolute text-sm text-gray-500 
                          duration-300 transform -translate-y-6 scale-75 top-5 -z-10
                          origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                          rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
                          peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
          Fecha de Nacimiento
        </label>
        {errors.birthday && (
          <span className='text-red-500 text-xs flex justify-end'>{errors.birthday}</span>
        )}
      </div>

      <div className='relative z-0 w-full mb-5 group'>
        <input 
          type='text'
          name='phone'
          id='phone' 
          className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
          border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
          focus:border-third-color peer'
          placeholder=' '
          onChange={handleChange}
          required
        />
        <label className='peer-focus:font-medium absolute text-sm text-gray-500 
                          duration-300 transform -translate-y-6 scale-75 top-5 -z-10
                          origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                          rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
                          peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
          Teléfono
        </label>
        {errors.phone && (
          <span className='text-red-500 text-xs flex justify-end'>{errors.phone}</span>
        )}
      </div>

      <div className='relative z-0 w-full mb-5 group'>
        <input 
          type='text'
          name='address'
          id='address' 
          className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
          border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
          focus:border-third-color peer'
          placeholder=' '
          onChange={handleChange}
          required
        />
        <label className='peer-focus:font-medium absolute text-sm text-gray-500 
                          duration-300 transform -translate-y-6 scale-75 top-5 -z-10
                          origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                          rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
                          peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
          Dirección
        </label>
        {errors.address && (
          <span className='text-red-500 text-xs flex justify-end'>{errors.address}</span>
        )}
      </div>

      <div className='relative z-0 w-full mb-5 group'>
        <input 
          type='text'
          name='country'
          id='country' 
          className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
          border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
          focus:border-third-color peer'
          placeholder=' '
          onChange={handleChange}
          required
        />
        <label className='peer-focus:font-medium absolute text-sm text-gray-500 
                          duration-300 transform -translate-y-6 scale-75 top-5 -z-10
                          origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                          rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
                          peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
          País
        </label>
        {errors.country && (
          <span className='text-red-500 text-xs flex justify-end'>{errors.country}</span>
        )}
      </div>

      <button
        type='submit'
        className='mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>
        Registrarse
      </button>
    </form>
  );
}
