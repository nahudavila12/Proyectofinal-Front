"use client";

import { ILogin, IRegisterOwner, IUser, IUserContextType, IUserResponse } from "@/interfaces/Interfaces";
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
            const data: IUserResponse = await postSignin(credentials);
            const { login, user: userInfo, token } = data;

            if (!login || !token) {
                throw new Error("Login failed");
            }

            setUser(userInfo);
            localStorage.setItem("user", JSON.stringify(userInfo));
            localStorage.setItem("Acces Token", token);
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
        setUser(null);
        setIsLogged(false);
    };

    useEffect(() => {
        const token = localStorage.getItem("Acces Token");
        setIsLogged(!!token);
    }, [user]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
    }, []); // Solo se ejecuta al montar el componente
    
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
