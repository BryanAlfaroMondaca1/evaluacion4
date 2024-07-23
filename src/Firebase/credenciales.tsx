// Firebase/credenciales.tsx

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyBzSynvv6TIgUIIILVGnfcMB4xIZ2l2hDs",
    authDomain: "evaluacion4-5a4fd.firebaseapp.com",
    projectId: "evaluacion4-5a4fd",
    storageBucket: "evaluacion4-5a4fd.appspot.com",
    messagingSenderId: "981344982682",
    appId: "1:981344982682:web:830ad6b2cd311001a43123"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
