// pages/actualizar-registro.tsx

import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/credenciales'; // Asegúrate de importar correctamente la configuración de Firebase

interface Registro {
  id: string;
  nombre: string;
  email: string;
}

const ActualizarRegistro: React.FC = () => {
  const [registro, setRegistro] = useState<Registro | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegistro = async () => {
      try {
        const docRef = doc(collection(db, 'users'), 'id_del_registro'); // Cambia 'id_del_registro' por el ID del registro
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRegistro({ id: docSnap.id, ...docSnap.data() } as Registro);
        } else {
          setError('Registro no encontrado');
        }
      } catch (err) {
        console.error('Error al obtener el registro:', err);
        setError('Error al obtener el registro');
      }
    };

    fetchRegistro();
  }, []);

  // Resto del código de la página
  return (
    <div className="container">
      {/* Agrega aquí el contenido y los formularios necesarios */}
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Renderiza el registro si existe */}
      {registro && (
        <div>
          <h1>Actualizar Registro</h1>
          <p>Nombre: {registro.nombre}</p>
          <p>Email: {registro.email}</p>
          {/* Agrega aquí el formulario para actualizar el registro */}
        </div>
      )}
    </div>
  );
};

export default ActualizarRegistro;
