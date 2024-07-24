// pages/actualizar.tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { app } from '../Firebase/credenciales';

const Actualizar: React.FC = () => {
  const router = useRouter();
  const { id, tipo } = router.query;

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const db = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      if (id && tipo) {
        try {
          const docRef = doc(db, tipo === 'usuario' ? 'usuarios' : 'tematicas', id as string);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            if (tipo === 'usuario') {
              setNombre(data.nombre);
              setEmail(data.email);
            } else {
              setNombre(data.nombre);
              setDescripcion(data.descripcion);
            }
          } else {
            setError('Elemento no encontrado.');
          }
        } catch (error) {
          setError('Error al obtener los datos.');
          console.error('Error al obtener los datos:', error);
        }
      }
    };

    fetchData();
  }, [id, tipo, db]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = doc(db, tipo === 'usuario' ? 'usuarios' : 'tematicas', id as string);
      await updateDoc(docRef, {
        nombre,
        ...(tipo === 'usuario' ? { email } : { descripcion })
      });
      setSuccess('Elemento actualizado con éxito');
    } catch (error) {
      setError('Error al actualizar el elemento.');
      console.error('Error al actualizar el elemento:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Actualizar {tipo === 'usuario' ? 'Usuario' : 'Temática'}</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
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
        {tipo === 'usuario' ? (
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        ) : (
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
        )}
        <button type="submit" className="btn btn-primary">Actualizar</button>
      </form>
    </div>
  );
};

export default Actualizar;
