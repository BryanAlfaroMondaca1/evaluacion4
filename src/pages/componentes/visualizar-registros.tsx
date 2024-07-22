// src/pages/visualizar-registros.tsx
import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import ModalEliminar from '../components/ModalEliminar';

const VisualizarRegistros = () => {
  const [registros, setRegistros] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRegistros = async () => {
      const querySnapshot = await getDocs(collection(db, 'coca-cola'));
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRegistros(docs);
    };
    fetchRegistros();
  }, []);

  const handleDeleteSuccess = () => {
    setRegistros(registros.filter(registro => registro.id !== selectedId));
    setSelectedId(null);
  };

  return (
    <div className="container">
      <h2>Registros</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Información</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro) => (
            <tr key={registro.id}>
              <td>{registro.id}</td>
              <td>{registro.data}</td>
              <td>
                <button 
                  className="btn btn-warning me-2" 
                  onClick={() => router.push(`/actualizar-registro/${registro.id}`)}
                >
                  Actualizar
                </button>
                <button 
                  className="btn btn-danger" 
                  onClick={() => { setSelectedId(registro.id); setShowModal(true); }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <ModalEliminar
          id={selectedId}
          onClose={() => setShowModal(false)}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default VisualizarRegistros;
