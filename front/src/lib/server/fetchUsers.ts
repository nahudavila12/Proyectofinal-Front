import { ILogin } from "../../interfaces/Interfaces";
import { IRegisterUser } from "../../interfaces/Interfaces";



export const postSignup = async (user: IRegisterUser) => {
  console.log("Datos enviados en la solicitud:", user); // Agrega esto para verificar los datos

  const response = await fetch("http://localhost:5000/auth/signup", {
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
  const response = await fetch("http://localhost:5000/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to sign in");
  }

  const data = await response.json();
  return data;
}