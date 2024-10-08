import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const StatisticsGraphs: React.FC = () => {

  const userData = {
    labels: ['Junio', 'Julio', 'Agosto', 'Septiembre'],
    datasets: [
      {
        label: 'Usuarios Activos',
        data: [30, 45, 60, 75],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const propertyData = {
    labels: ['Casas', 'Departamentos', 'Cabañas'],
    datasets: [
      {
        label: 'Tipos de Propiedades',
        data: [20, 15, 10],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4">
          <Bar data={userData} />
        </div>
        <div className="p-4">
          <Pie data={propertyData} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsGraphs;
