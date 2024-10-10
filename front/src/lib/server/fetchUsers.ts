import { ILogin, IRegisterOwner, IRegisterUser, ISendEmailData,  } from "../../interfaces/Interfaces";

export const postSignup = async (user: IRegisterUser) => {
  console.log("Datos enviados en la solicitud:", user);

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
};

export const postSignin = async (credentials: ILogin) => {
  const response = await fetch("http://localhost:3000/auth/signin", {
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
};

export const postSignupOwner = async (uuid: string, ownerData: IRegisterOwner) => {
  const url = `http://localhost:3000/owners/addOwner/${uuid}`;

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

  const data = await response.json();
  return data;
};

// Nueva función para enviar correos electrónicos
export const postSendEmail = async (emailData: ISendEmailData) => {
  const response = await fetch("http://localhost:3000/email/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to send email");
  }

  const data = await response.json();
  return data;
};
