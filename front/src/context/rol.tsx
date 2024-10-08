import { IRol } from '@/interfaces/Interfaces';
import React, { createContext, useState, useContext, ReactNode } from 'react';


interface AuthContextProps {
  rol: IRol | null;
  login: (newRol: IRol) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [rol, setRol] = useState<IRol | null>(null);

  const login = (newRol: IRol) => setRol(newRol);
  const logout = () => setRol(null);

  return (
    <AuthContext.Provider value={{ rol, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de AuthProvider');
  }
  return context;
};
