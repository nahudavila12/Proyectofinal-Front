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


export default function InstaStayLogin() {
  const { signIn } = useContext(UserContext);
  
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
      bgGradient="linear(to-br, blue.300, blue.300, cyan.400)"
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
        <Text fontSize="4xl" fontWeight="bold" textAlign="center" color="blue.600" mb={6}>InstaStay</Text>
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
