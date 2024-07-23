import React, { useState, FormEvent } from 'react'; // Asegúrate de importar FormEvent

const RegistroTematico = () => {
  const [info, setInfo] = useState('');

  const manejarRegistro = (e: FormEvent<HTMLFormElement>) => { // Especifica el tipo aquí
    e.preventDefault();
    console.log('Información registrada:', info);  // Procesar registro
    // Aquí podrías añadir el código para almacenar la información en una base de datos o estado global
  };

  return (
    <form onSubmit={manejarRegistro}>
      <input type="text" value={info} onChange={(e) => setInfo(e.target.value)} placeholder="Información de la temática" />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegistroTematico;
