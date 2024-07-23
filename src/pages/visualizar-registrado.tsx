// pages/visualizar-registrado.tsx

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/credenciales'; // Importa la configuración de Firebase

interface User {
  id: string;
  name: string;
  email: string;
}

const VisualizarRegistrado: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersData: User[] = querySnapshot.docs.map((doc) => {
          // Verifica que los campos existan y sean accesibles
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || 'Nombre no disponible',
            email: data.email || 'Email no disponible',
          };
        });
        setUsers(usersData);
      } catch (err) {
        console.error("Error al obtener los usuarios:", err);
        setError('Error al obtener los usuarios');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Usuarios Registrados</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No hay usuarios registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VisualizarRegistrado;
