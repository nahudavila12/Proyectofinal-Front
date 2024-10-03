import { ILogin } from "../../interfaces/Interfaces";
import { IRegisterUser } from "../../interfaces/Interfaces";



export const postSignup = async (user: IRegisterUser) => {
  console.log("Datos enviados en la solicitud:", user); // Agrega esto para verificar los datos

  const response = await fetch("http://localhost:3001/auth/signup", {
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

  const response = await fetch("http://localhost:3001/auth/signin", {
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