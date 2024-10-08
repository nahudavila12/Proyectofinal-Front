import { IRol } from '@/interfaces/Interfaces';
import React, { createContext, useState, useContext, ReactNode } from 'react';


interface AuthContextProps {
  role: IRol | null;
  login: (newRole: IRol) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<IRol | null>(null);

  const login = (newRole: IRol) => setRole(newRole);
  const logout = () => setRole(null);

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
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
