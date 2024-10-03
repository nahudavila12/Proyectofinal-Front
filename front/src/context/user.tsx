"use client";


import { ILogin, IUser, IUserContextType, IUserResponse } from "@/interfaces/Interfaces";
// import { getUsersOrders } from "@/lib/server/fetchOrders";
import { postSignin, postSignup } from "@/lib/server/fetchUsers";

import { createContext, useEffect, useState } from "react";


export const UserContext = createContext<IUserContextType> ({
    user: null,
    setUser: () => {},
    isLogged: false,
    setIsLogged: () => {},
    signIn: async () => false,
    signUp: async () => false,
    // getOrders: async () => {},
    // orders: [],
    logOut: () => {},
});

export const UserNormalProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<Partial <IUserResponse> | null>(null);
    const [isLogged, setIsLogged] = useState(false);
    // const [orders, setOrders] = useState<IOrderResponse[]>([]);

    const signIn = async (credentials: ILogin) => {
        try {
            const data = await postSignin(credentials);
            
            // Verificar la estructura de `data`
            // console.log("Data recibida del servidor:", data);
            // console.log("Token generado (comprobación directa):", data?.generateAccessToken);
    
            // Descomponer la respuesta para mejor comprensión
            const { generateAccessToken, generateRefreshToken } = data;
    
       
    
            // Condición actualizada para verificar la existencia de `generateAccessToken`
            if (!generateAccessToken) { 
                throw new Error("Access token not found");
            }
    
            // Almacenar el token y datos en localStorage
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("Acces Token", generateAccessToken);
            localStorage.setItem("Refresh Token",generateRefreshToken);
            setIsLogged(true);
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };

    const signUp = async (user: Omit<IUser, "uuid">) => {
        try {
            const data = await postSignup(user);
            
            if (data.uuid) {
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    };
    



    // const getOrders = useCallback(async () => {
        
    //     try {
    //         const token = localStorage.getItem("token") || "";
            
    //         const data = await getUsersOrders(token);
            
    //         setOrders(data);
    //     } catch (error) {
    //         console.error("Error en getOrders:", error);
    //     }
    // }, []);

    const logOut = () => {
            localStorage.removeItem("user");
            localStorage.removeItem("Acces Token"); // Asegúrate de eliminar el token correcto
            localStorage.removeItem("Refresh Token");
            setUser(null);
            setIsLogged(false);
    };

     useEffect(() => {
        const token = localStorage.getItem("Acces Token");
        if (token) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, [user]);

    // Efecto para obtener el usuario desde el almacenamiento local
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
        } else {
            setUser(null);
        }
    }, []); // Solo se ejecuta al montar el componente
    
    return(<UserContext.Provider 
                value={{
                    user,
                    setUser,
                    isLogged,
                    setIsLogged,
                    signIn,
                    signUp,
                    // getOrders,
                    // orders,
                    logOut,
                }}
            >
        {children}

      </UserContext.Provider>
    );
};