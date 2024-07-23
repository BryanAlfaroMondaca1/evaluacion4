import React from 'react';
import Link from 'next/link';

const IndexPage = () => {
  return (
    <div>
      <h1>Bienvenido a la Aplicación</h1>
      <nav>
        <ul>
          <li><Link href="/componentes/inicio-sesion">Iniciar Sesión</Link></li>
          <li><Link href="/componentes/menu">Menú Principal</Link></li>
          <li><Link href="/componentes/registro-tematica">Registro Temático</Link></li>
          <li><Link href="/componentes/visualizar-registros">Visualizar Registros</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default IndexPage;
