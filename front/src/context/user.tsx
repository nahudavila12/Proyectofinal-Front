"use client";

import { ILogin, IRegisterOwner, ISendEmailData, IUser, IUserContextType } from "@/interfaces/Interfaces";
import { postSignin, postSignup, postSignupOwner, postSendEmail } from "@/lib/server/fetchUsers"; // Asegúrate de que esta función exista
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<IUserContextType>({
    user: null,
    setUser: () => {},
    isLogged: false,
    setIsLogged: () => {},
    signIn: async () => false,
    signUp: async () => false,
    signUpOwner: async () => false,
    logOut: () => {},
    sendEmail: async () => false,
});

export const UserNormalProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Partial<IUser> | null>(null);
    const [isLogged, setIsLogged] = useState(false);

    const signIn = async (credentials: ILogin) => {
        try {
            const data = await postSignin(credentials);
            const { generateAccessToken, generateRefreshToken, ownerUUID } = data;

            if (!generateAccessToken) { 
                throw new Error("Access token not found");
            }
            if (ownerUUID) {
                localStorage.setItem("ownerUUID", ownerUUID);
            }

            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("Acces Token", generateAccessToken);
            localStorage.setItem("Refresh Token", generateRefreshToken);
            setIsLogged(true);
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };

    const signUp = async (user: Omit<IUser, "uuid">): Promise<boolean> => {
        try {
            const data = await postSignup(user);
            return !!data.uuid; // Retornar true si se creó exitosamente, de lo contrario false.
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const signUpOwner = async (uuid: string, ownerData: IRegisterOwner) => {
        try {
            const data = await postSignupOwner(uuid, ownerData);
            return !!data.uuid; // Retornar true si se creó exitosamente, de lo contrario false.
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const logOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("Acces Token");
        localStorage.removeItem("Refresh Token");
        localStorage.removeItem("ownerUUID");
        setUser(null);
        setIsLogged(false);
    };

    const sendEmail = async (emailData: ISendEmailData): Promise<boolean> => {
        try {
            const response = await postSendEmail(emailData);
            return response; // Retorna true si el envío fue exitoso
        } catch (error) {
            console.error("Email sending failed:", error);
            return false;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("Acces Token");
        const storedUser = localStorage.getItem("user");

        console.log("Token desde localStorage:", token); // Log para verificar el token
        console.log("Usuario almacenado:", storedUser); // Log para verificar el usuario almacenado

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser); // Configura el estado de `user` si hay un usuario almacenado
            setIsLogged(!!token);
            console.log("Usuario establecido:", parsedUser); // Log para verificar el usuario establecido
        } else {
            setUser(null);
            setIsLogged(false);
        }
    }, []);

    return (
        <UserContext.Provider 
            value={{
                user,
                setUser,
                isLogged,
                setIsLogged,
                signIn,
                signUp,
                signUpOwner,
                logOut,
                sendEmail,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
