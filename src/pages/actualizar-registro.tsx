

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/credenciales';
import { IPersona } from '../Interfaces/IPersona';

const ActualizarRegistro: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [registro, setRegistro] = useState<IPersona | null>(null);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState<number | ''>('');
  const [correo, setCorreo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerRegistro = async () => {
      if (id) {
        const docRef = doc(db, "usuarios", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as IPersona;
          setRegistro(data);
          setNombre(data.nombre);
          setEdad(data.edad);
          setCorreo(data.correo);
        } else {
          console.error("Registro no encontrado");
        }
      }
    };

    obtenerRegistro();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      const docRef = doc(db, "usuarios", id);
      try {
        await updateDoc(docRef, {
          nombre,
          edad,
          correo
        });
        navigate('/visualizar-registrado');
      } catch (error) {
        console.error("Error al actualizar el registro:", error);
      }
    }
  };

  if (!registro) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container mt-5">
      <h1>Actualizar Registro</h1>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
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
          <label htmlFor="edad" className="form-label">Edad</label>
          <input
            type="number"
            id="edad"
            className="form-control"
            value={edad}
            onChange={(e) => setEdad(Number(e.target.value))}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo</label>
          <input
            type="email"
            id="correo"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Actualizar</button>
      </form>
    </div>
  );
};

export default ActualizarRegistro;
