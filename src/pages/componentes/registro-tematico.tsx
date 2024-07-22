// src/pages/registro-tematico.tsx
import { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const RegistroTematico = () => {
  const [data, setData] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'coca-cola'), { data });
      setData('');
      alert('Registro exitoso');
    } catch (error) {
      console.error(error);
      alert('Error en el registro');
    }
  };

  return (
    <div className="container">
      <h2>Registro Temático</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Información</label>
          <input
            type="text"
            className="form-control"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
    </div>
  );
};

export default RegistroTematico;
