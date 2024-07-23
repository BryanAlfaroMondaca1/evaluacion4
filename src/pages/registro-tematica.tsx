// src/pages/RegistroTematica.tsx

import React from 'react';

const RegistroTematica: React.FC = () => {
  return (
    <div className="container mt-5">
      <header className="bg-danger text-white py-3">
        <h1>Registro Temática - Coca-Cola</h1>
      </header>
      <div className="mt-4">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Coca_Cola_logo.svg" alt="Coca-Cola" className="img-fluid" />
        <p className="mt-3">Aquí puedes registrar información sobre Coca-Cola.</p>
        {/* Agrega campos específicos según sea necesario */}
      </div>
    </div>
  );
};

export default RegistroTematica;
