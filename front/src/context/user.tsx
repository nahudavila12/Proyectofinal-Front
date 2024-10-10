"use client";

import { ILogin, IRegisterOwner, IUser, IUserContextType } from "@/interfaces/Interfaces";
import { postSignin, postSignup, postSignupOwner } from "@/lib/server/fetchUsers";
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
});

export const UserNormalProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Partial<IUser> | null>(null);
    const [isLogged, setIsLogged] = useState(false);

    const signIn = async (credentials: ILogin) => {
        try {
            const data = await postSignin(credentials);
    
            // Descomponer la respuesta para mejor comprensión
            const { generateAccessToken, generateRefreshToken, ownerUUID } = data;
    
       
           
            // Condición actualizada para verificar la existencia de `generateAccessToken`
            if (!generateAccessToken) { 
                throw new Error("Access token not found");
            }
            if (ownerUUID) {
                localStorage.setItem("ownerUUID", ownerUUID);
            }

            // const decoded: IPayload = jwtDecode(generateAccessToken);

            // Almacenar el token y datos en localStorage
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            setUser({ ...data});
            localStorage.setItem("user", JSON.stringify({ ...data}));
            localStorage.setItem("Acces Token", generateAccessToken);
            localStorage.setItem("Refresh Token",generateRefreshToken);
            setIsLogged(true);
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };
    // const signIn = async (credentials: ILogin) => {
    //     try {
            
    //         const data = await postSignin(credentials);
    //         const { login, user: userInfo, token } = data;

    //         if (!login || !token) {
    //             throw new Error("Login failed");
    //         }

    //         // Almacenar el token y datos en localStorage
    //         setUser(userInfo);
    //         localStorage.setItem("user", JSON.stringify(userInfo));
    //         localStorage.setItem("Acces Token", token);
    //         setIsLogged(true);
    //         localStorage.setItem("user", JSON.stringify(data));
    //         localStorage.setItem("user", JSON.stringify({ ...data }));
    //         localStorage.setItem("user", JSON.stringify(userInfo));
    //         console.log("Usuario iniciado sesión:", data);
    //         return true;
    //     } catch (error) {
    //         console.error("Login failed:", error);
    //         return false;
    //     }
    // };


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
        localStorage.removeItem("Acces Token"); // Asegúrate de eliminar el token correcto
        localStorage.removeItem("Refresh Token");
        localStorage.removeItem("ownerUUID")
        setUser(null);
        setIsLogged(false);
};

    useEffect(() => {
        const token = localStorage.getItem("Acces Token");
        setIsLogged(!!token);
        console.log("Estado de isLogged:", !!token);
    }, [user]);
    
    useEffect(() => {
        const token = localStorage.getItem("Acces Token");
        const storedUser = localStorage.getItem("user");

        if (token) {
            // const decoded: IPayload = jwtDecode(token);
            setUser((prev) => ({ ...prev })); // Actualiza `user` solo si es necesario
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Configura el estado de `user` si hay un usuario almacenado
        } else {
            setUser(null);
        }
    }, []); 
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
        } else {
            setUser(null);
        }
    }, []); // Solo se ejecuta al montar el component // Solo se ejecuta al montar el componente
    
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
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
