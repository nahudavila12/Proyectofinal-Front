import React, { useEffect, useState } from 'react';
import { IUser } from '../interfaces/IUser';

const UsersSection: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Usuarios</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border-b-2 pb-2">Nombre</th>
            <th className="border-b-2 pb-2">Email</th>
            <th className="border-b-2 pb-2">Estado</th>
            <th className="border-b-2 pb-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uuid}>
              <td className="py-2">{`${user.firstName} ${user.lastName}`}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">{user.isActive ? 'Activo' : 'Baneado'}</td>
              <td className="py-2">
                <button className="bg-yellow-500 text-white px-4 py-1 rounded mr-2">Editar</button>
                <button className="bg-red-500 text-white px-4 py-1 rounded">Banear</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersSection;
