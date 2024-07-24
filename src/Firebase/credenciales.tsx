// Firebase/credenciales.tsx

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBzSynvv6TIgUIIILVGnfcMB4xIZ2l2hDs",
  authDomain: "evaluacion4-5a4fd.firebaseapp.com",
  projectId: "evaluacion4-5a4fd",
  storageBucket: "evaluacion4-5a4fd.appspot.com",
  messagingSenderId: "981344982682",
  appId: "1:981344982682:web:830ad6b2cd311001a43123"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
