
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzSynvv6TIgUIIILVGnfcMB4xIZ2l2hDs",
  authDomain: "evaluacion4-5a4fd.firebaseapp.com",
  projectId: "evaluacion4-5a4fd",
  storageBucket: "evaluacion4-5a4fd.appspot.com",
  messagingSenderId: "981344982682",
  appId: "1:981344982682:web:830ad6b2cd311001a43123"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };
