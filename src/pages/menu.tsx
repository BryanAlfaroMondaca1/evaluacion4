

import React from 'react';
import Link from 'next/link';

const Menu: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1>Menú Principal</h1>
      <ul className="list-group">
        <li className="list-group-item">
          <Link href="/registrarUsuario">Registrar Nuevo Usuario</Link>
        </li>
        <li className="list-group-item">
          <Link href="/registro-tematica">Registrar por Temática</Link>
        </li>
        <li className="list-group-item">
          <Link href="/visualizar-registrado">Visualizar lo Registrado</Link>
        </li>
        <li className="list-group-item">
          <Link href="/visualizar-tematicas">Visualizar Temáticas</Link>
        </li>
        <li className="list-group-item">
          <Link href="/logout">Salir</Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
