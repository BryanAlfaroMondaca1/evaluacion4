import React, { useState, FormEvent } from 'react'; // Importa FormEvent
import { auth } from '../../Firebase/firebase';  // Asegúrate que la ruta es correcta
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {  // Añade el tipo aquí
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Usuario creado exitosamente
        console.log("Usuario registrado:", userCredential);
      })
      .catch((error) => {
        console.error("Error registrando el usuario:", error);
        alert("Error al registrar usuario: " + error.message);
      });
  };

  return (
    <form onSubmit={handleRegister}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Registrar</button>
    </form>
  );
};

export default Register;
