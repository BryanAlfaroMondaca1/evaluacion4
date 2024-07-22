// src/pages/actualizar-registro/[id].tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const ActualizarRegistro = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchRecord = async () => {
      if (id) {
        const docRef = doc(db, 'coca-cola', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data().data);
        }
      }
    };
    fetchRecord();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'coca-cola', id);
      await updateDoc(docRef, { data });
      alert('Actualización exitosa');
      router.push('/visualizar-registros');
    } catch (error) {
      console.error(error);
      alert('Error en la actualización');
    }
  };

  return (
    <div className="container">
      <h2>Actualizar Registro</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Información</label>
          <input
            type="text"
            className="form-control"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Actualizar</button>
      </form>
    </div>
  );
};

export default ActualizarRegistro;
