

import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { app } from '../Firebase/credenciales'; // Asegúrate de que 'app' esté correctamente exportado

interface User {
  id: string;
  name: string;
  email: string;
}

interface Tematica {
  id: string;
  nombre: string;
  descripcion: string;
}

const Visualizar: React.FC = () => {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [tematicas, setTematicas] = useState<Tematica[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [type, setType] = useState<'usuario' | 'tematica' | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const db = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch users
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersData: User[] = usersSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || 'Nombre no disponible',
            email: data.email || 'Email no disponible',
          };
        });
        setUsuarios(usersData);

        // Fetch tematicas
        const tematicasSnapshot = await getDocs(collection(db, 'tematicas'));
        const tematicasData = tematicasSnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Tematica, 'id'>)
        }));
        setTematicas(tematicasData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setError('Error al obtener los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [db]);

  const handleDelete = async (id: string, type: 'usuario' | 'tematica') => {
    setSelectedId(id);
    setType(type);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (selectedId && type) {
      try {
        await deleteDoc(doc(db, type === 'usuario' ? 'users' : 'tematicas', selectedId));
        setShowModal(false);
        // Refresh data
        const fetchData = async () => {
          const usersSnapshot = await getDocs(collection(db, 'users'));
          const usersData: User[] = usersSnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name || 'Nombre no disponible',
              email: data.email || 'Email no disponible',
            };
          });
          setUsuarios(usersData);

          const tematicasSnapshot = await getDocs(collection(db, 'tematicas'));
          const tematicasData = tematicasSnapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<Tematica, 'id'>)
          }));
          setTematicas(tematicasData);
        };

        fetchData();
      } catch (error) {
        console.error('Error al eliminar el elemento:', error);
        setError('Error al eliminar el elemento');
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h1>Visualizar Datos Registrados</h1>

      <h2>Usuarios Registrados</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map(usuario => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.name}</td>
                <td>{usuario.email}</td>
                <td>
                  <button onClick={() => handleDelete(usuario.id, 'usuario')} className="btn btn-danger btn-sm">Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No hay usuarios registrados.</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Temáticas Registradas</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tematicas.length > 0 ? (
            tematicas.map(tematica => (
              <tr key={tematica.id}>
                <td>{tematica.id}</td>
                <td>{tematica.nombre}</td>
                <td>{tematica.descripcion}</td>
                <td>
                  <button onClick={() => handleDelete(tematica.id, 'tematica')} className="btn btn-danger btn-sm">Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No hay temáticas registradas.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal para Confirmación de Eliminación */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Eliminación</h5>
                <button type="button" className="close" aria-label="Close" onClick={handleModalClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>¿Está seguro de que desea eliminar este {type === 'usuario' ? 'usuario' : 'elemento'}?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Cancelar</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visualizar;
