import React from 'react';

/* import { useAuth } from '../../context/rol'; */
import AdminDashboard from '@/components/dashboard-admin/dashboard';

const AdminPage: React.FC = () => {
  // const { role } = useAuth(); // Remove this line if not needed

  // Remove the role check
  return <AdminDashboard />;
};

export default AdminPage;
