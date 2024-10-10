import { IUser } from '@/interfaces/Interfaces';
import React, { useEffect, useState } from 'react';
export default function UsersSection() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); 
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(`http://localhost:3001/admin/allUsers?page=${page}&limit=${limit}`);
        if (!res.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [page, limit]);

  const banUser = async (uuid: string) => {
    try {
      const res = await fetch(`http://localhost:3001/admin/bannUser/${uuid}`, {
        method: 'PUT', 
      });
      if (!res.ok) {
        throw new Error('Error al banear el usuario');
      }
      // Actualiza la lista de usuarios después de banear
      setUsers((prev) => prev.map(user => user.uuid === uuid ? { ...user, isActive: false } : user));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  const deleteUser = async (uuid: string) => {
    try {

      const res = await fetch(`http://localhost:3000/users/delete/${uuid}`, {

        method: 'DELETE', 
      });
      if (!res.ok) {
        throw new Error('Error al eliminar el usuario');
      }
      // Actualiza la lista de usuarios después de eliminar
      setUsers((prev) => prev.filter(user => user.uuid !== uuid));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };
  if (loading) {
    return <div>Cargando usuarios...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Usuarios</h2>
      
      <div className="mb-4">
        <label htmlFor="limit" className="mr-2">Mostrar:</label>
        <select id="limit" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </div>
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
                <button
                  className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
                  onClick={() => banUser(user.uuid)}
                  disabled={!user.isActive} // Desactivar si ya está baneado
                >
                  Banear
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded"
                  onClick={() => deleteUser(user.uuid)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}