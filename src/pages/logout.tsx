

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../Firebase/credenciales';

const Logout: React.FC = () => {
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    signOut(auth).then(() => {
      router.push('/login'); 
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }, [auth, router]);

  return (
    <div>
      <p>Redirigiendo...</p>
    </div>
  );
};

export default Logout;
