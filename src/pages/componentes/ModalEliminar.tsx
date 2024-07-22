// src/components/ModalEliminar.tsx
import { useState } from 'react';
import { db } from '../firebase';



import { doc, deleteDoc } from 'firebase/firestore';

const ModalEliminar = ({ id, onClose, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, 'coca-cola', id);
      await deleteDoc(docRef);
      setLoading(false);
      onDeleteSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert('Error al eliminar');
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmar Eliminación</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>¿Está seguro de que desea eliminar este registro?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="button" className="btn btn-danger" onClick={handleDelete} disabled={loading}>
              {loading ? 'Eliminando...' : 'Eliminar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEliminar;
