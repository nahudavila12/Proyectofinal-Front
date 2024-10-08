import React from 'react';

interface DashboardHeaderProps {
  setActiveSection: (section: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ setActiveSection }) => {
  return (
    <div className="flex justify-between items-center p-4 #FFF5EB text-black rounded-md">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="flex space-x-4">
        <button onClick={() => setActiveSection('users')} className="hover:underline">Usuarios</button>
        <button onClick={() => setActiveSection('reservations')} className="hover:underline">Reservas</button>
        <button onClick={() => setActiveSection('properties')} className="hover:underline">Propiedades</button>
        <button onClick={() => setActiveSection('statistics')} className="hover:underline">Estadísticas</button>
      </div>
    </div>
  );
};

export default DashboardHeader;

