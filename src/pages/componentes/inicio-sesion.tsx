// src/pages/inicio-sesion.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';

const InicioSesion = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      router.push('/tablero');
    } else {
      alert('Acceso denegado: Credenciales incorrectas');
    }
  };

  return (
    <div className="container">
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Nombre de Usuario</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default InicioSesion;
