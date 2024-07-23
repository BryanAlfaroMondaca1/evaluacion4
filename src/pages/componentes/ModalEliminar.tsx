import React from 'react';
import { db } from '../../Firebase/firebase'; // Asegúrate de que la ruta está correcta
import { doc, deleteDoc } from 'firebase/firestore';

interface ModalEliminarProps {
  id: string; // Ajusta el tipo según los datos reales que manejes
  onClose: () => void;
  onDeleteSuccess: () => void;
}

const ModalEliminar: React.FC<ModalEliminarProps> = ({ id, onClose, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      const docRef = doc(db, 'tuColección', id); // Asegúrate de cambiar 'tuColección' por el nombre real de tu colección
      await deleteDoc(docRef);
      onDeleteSuccess();
    } catch (error) {
      console.error('Error al eliminar el documento: ', error);
      alert('Error al eliminar el documento');
    }
    onClose();
  };

  return (
    <div className="modal show d-block" tabIndex={-1}>

      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmar Eliminación</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>¿Estás seguro de que deseas eliminar este registro?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEliminar;
