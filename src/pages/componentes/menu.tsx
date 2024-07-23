import React, { useState } from 'react';
import Link from "next/link";

const Menu: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/register">
            <a>Registrar nuevo usuario</a>
          </Link>
        </li>
        <li>
          <Link href="/view-registered">
            <a>Visualizar lo registrado</a>
          </Link>
        </li>
        <li>
          <Link href="/logout">
            <a>Salir</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;