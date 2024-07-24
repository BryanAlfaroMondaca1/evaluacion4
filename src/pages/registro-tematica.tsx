// pages/registro-tematica.tsx

import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { app } from '../Firebase/credenciales';

const RegistroTematica: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const db = getFirestore(app);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'tematicas'), {
        nombre,
        descripcion
      });
      setSuccess('Temática registrada con éxito');
      setNombre('');
      setDescripcion('');
    } catch (error) {
      setError('Error al registrar la temática');
      console.error('Error al registrar la temática:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Registrar Temática</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre de la Temática</label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            id="descripcion"
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Registrar Temática</button>
      </form>
    </div>
  );
};

export default RegistroTematica;
