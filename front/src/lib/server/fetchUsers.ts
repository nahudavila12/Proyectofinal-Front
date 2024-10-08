import { ILogin, IRegisterOwner } from "../../interfaces/Interfaces";
import { IRegisterUser } from "../../interfaces/Interfaces";



export const postSignup = async (user: IRegisterUser) => {
  console.log("Datos enviados en la solicitud:", user); // Agrega esto para verificar los datos

  const response = await fetch("http://localhost:3000/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to sign up");
  }

  const data = await response.json();
  return data;
}

export const postSignin = async (credentials: ILogin) => {

  const response = await fetch("http://localhost:3000/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials), // Verifica si las credenciales están bien formateadas
  });

  if (!response.ok) {
    const errorData = await response.json();
    // console.error("Error en login:", errorData); // Verifica el mensaje de error detallado
    throw new Error(errorData.message || "Failed to sign in");
  }

  const data = await response.json();
  // console.log("Respuesta del servidor en login:", data); // Verificar la respuesta del backend
  return data;
};



export const postSignupOwner = async (uuid: string, ownerData: IRegisterOwner) => {
  // Construye la URL usando el UUID proporcionado como parámetro
  const url = `http://localhost:3000/owners/addOwner/${uuid}`;

  // Realiza la solicitud POST para registrar al propietario con la URL dinámica
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ownerData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to sign up as owner");
  }

  // Devuelve la respuesta completa del servidor
  const data = await response.json();
  return data;
};

