

"use client"; 

import React, { useState } from 'react';

import StatisticsGraphs from './statiticsGraph';
import PropertiesSection from './properties';
import ReservationsSection from './reservation';
import UsersSection from './user';
import DashboardHeader from './header';

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('users');

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <DashboardHeader setActiveSection={setActiveSection} />
      
      <div className="mt-8">
        {activeSection === 'users' && <UsersSection />}
        {activeSection === 'reservations' && <ReservationsSection />}
        {activeSection === 'properties' && <PropertiesSection />}
        {activeSection === 'statistics' && <StatisticsGraphs />}
      </div>
    </div>
  );
};

export default AdminDashboard;
