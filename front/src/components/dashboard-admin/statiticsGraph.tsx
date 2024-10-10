import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface IUser {
  isActive: boolean;
}

interface IProperty {
  propertyType: string;
}

const StatisticsGraphs: React.FC = () => {
  const [userData, setUserData] = useState<number[]>([]);
  const [propertyData, setPropertyData] = useState<number[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:3000/admin/allUsers');
        const users: IUser[] = await res.json();

        // Conteo de usuarios activos
        const activeUsersCount = users.filter(user => user.isActive).length;

        // Lógica para usar estos datos (podrías adaptarlo según meses)
        setUserData([activeUsersCount]); // Si necesitas hacerlo por meses, podrías ajustar aquí
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchProperties = async () => {
      try {
        const res = await fetch('http://localhost:3000/properties');
        const properties: IProperty[] = await res.json();
        const hotelCount = properties.filter((p) => p.propertyType === 'hotel').length;
        const departmentCount = properties.filter((p) => p.propertyType === 'departamento').length;
        const cabanaCount = properties.filter((p) => p.propertyType === 'cabaña').length;

        setPropertyData([hotelCount, departmentCount, cabanaCount]);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchUsers();
    fetchProperties();
  }, []);

  const userChartData = {
    labels: ['Usuarios Activos'], // Podrías expandir esto a meses si tienes los datos
    datasets: [
      {
        label: 'Usuarios Activos',
        data: userData,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const propertyChartData = {
    labels: ['Hoteles', 'Departamentos', 'Cabañas'],
    datasets: [
      {
        label: 'Tipos de Propiedades',
        data: propertyData,
        backgroundColor: ['#FFF5EB', '#4D8DA1', '#92D6BB'],
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4">
          <Bar data={userChartData} />
        </div>
        <div className="p-4">
          <Pie data={propertyChartData} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsGraphs;
