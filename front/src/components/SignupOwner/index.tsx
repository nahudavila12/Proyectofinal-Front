
"use client";

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormControl, FormLabel, Input, Button, FormErrorMessage, Box } from '@chakra-ui/react';
import { UserContext } from '@/context/user'; // Asegúrate de que la ruta sea correcta
import { IRegisterOwner } from "@/interfaces/Interfaces";

export default function RegisterOwnerForm() {
  const { user } = useContext(UserContext); // Obtén el contexto del usuario
  const [registerOwnerValues, setRegisterOwnerValues] = useState<IRegisterOwner>({
    bussines_name: '',
    bussinesId: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const uuid = user?.uuid || null; // Asegúrate de que uuid sea null si no está definido

  const validateField = (field: keyof IRegisterOwner, value: string): string | null => {
    if (!value) {
      return 'Este campo es obligatorio.';
    }
    if (field === 'email' && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      return 'Email inválido.';
    }
    return null;
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterOwnerValues({ ...registerOwnerValues, [name]: value });


    const error = validateField(name as keyof IRegisterOwner, value);
    setErrors({ ...errors, [name]: error || '' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const newErrors: { [key: string]: string } = {};
    Object.keys(registerOwnerValues).forEach((field) => {
      const fieldError = validateField(field as keyof IRegisterOwner, registerOwnerValues[field as keyof IRegisterOwner]);
      if (fieldError) newErrors[field] = fieldError;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    const owner = { ...registerOwnerValues };

    // Asegúrate de que uuid no sea null
    if (uuid) {
      const success = await registerOwner(owner, uuid); // Usa el uuid del contexto

      if (success) {
        const roleUpdated = await updateUserRole(uuid, 'owner'); // Actualiza el rol del usuario

        if (roleUpdated) {
          router.push('/property-form');
        } else {
          alert('Error al actualizar el rol del usuario.');
        }
      } else {
        alert('Error al registrar el propietario.');
      }
    } else {
      alert('No se pudo obtener el UUID del usuario.');
    }

    setLoading(false);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4}>
      {/* Nombre de Empresa */}
      <FormControl isInvalid={!!errors.bussines_name} mb={4}>
        <FormLabel>Nombre de Empresa o Propietario</FormLabel>
        <Input
          type="text"
          name="bussines_name"
          value={registerOwnerValues.bussines_name}
          onChange={handleChange}
          placeholder="Nombre de Empresa o Propietario"
        />
        <FormErrorMessage>{errors.bussines_name}</FormErrorMessage>
      </FormControl>

      {/* NIT */}
      <FormControl isInvalid={!!errors.bussinesId} mb={4}>
        <FormLabel>NIT de Empresa/Propietario</FormLabel>
        <Input
          type="text"
          name="bussinesId"
          value={registerOwnerValues.bussinesId}
          onChange={handleChange}
          placeholder="NIT de Empresa/Propietario"
        />
        <FormErrorMessage>{errors.bussinesId}</FormErrorMessage>
      </FormControl>

      {/* Correo Electrónico */}
      <FormControl isInvalid={!!errors.email} mb={4}>
        <FormLabel>Correo Electrónico</FormLabel>
        <Input
          type="email"
          name="email"
          value={registerOwnerValues.email}
          onChange={handleChange}
          placeholder="Correo Electrónico"
        />
        <FormErrorMessage>{errors.email}</FormErrorMessage>
      </FormControl>

      {/* Teléfono */}
      <FormControl isInvalid={!!errors.phone} mb={4}>
        <FormLabel>Teléfono</FormLabel>
        <Input
          type="tel"
          name="phone"
          value={registerOwnerValues.phone}
          onChange={handleChange}
          placeholder="Teléfono"
        />
        <FormErrorMessage>{errors.phone}</FormErrorMessage>
      </FormControl>

      <Button type="submit" colorScheme="blue" width="full" isLoading={loading}>
        Registrar
      </Button>
    </Box>
  );
}

async function registerOwner(owner: IRegisterOwner, uuid: string): Promise<boolean> {
  try {
    const response = await fetch(`http://localhost:3000/owner/addOwner/${uuid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(owner),
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud al registrar el propietario.');
    }

    return true; 
  } catch (error) {
    console.error(error);
    return false; 
  }
}

// Nueva función para actualizar el rol del usuario
async function updateUserRole(uuid: string, rol: string): Promise<boolean> {
  try {
    const response = await fetch(`http://localhost:3000/user/${uuid}/role`, {
      method: 'PATCH', // Supongo que quieres usar PATCH para actualizar el rol
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rol}), // Envío del nuevo rol
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud al actualizar el rol del usuario.');
    }

    return true; 
  } catch (error) {
    console.error(error);
    return false; 
  }
}

