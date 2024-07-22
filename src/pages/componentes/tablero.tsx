// src/pages/tablero.tsx
import Link from 'next/link';

const Tablero = () => {
  return (
    <div className="container">
      <h2>Tablero</h2>
      <ul className="list-group">
        <li className="list-group-item">
          <Link href="/registrar-usuario">
            <a>Registrar nuevo usuario</a>
          </Link>
        </li>
        <li className="list-group-item">
          <Link href="/registro-tematico">
            <a>Registro según temática</a>
          </Link>
        </li>
        <li className="list-group-item">
          <Link href="/visualizar-registros">
            <a>Visualizar lo registrado</a>
          </Link>
        </li>
        <li className="list-group-item">
          <Link href="/inicio-sesion">
            <a>Salir</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Tablero;
