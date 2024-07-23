import React, { FormEvent, useState } from 'react';
import { db } from '../../../Firebase/firebase'; // Asegúrate de que la ruta es correcta
import { doc, getDoc } from 'firebase/firestore';

const IdPage = () => {
  const [documentId, setDocumentId] = useState('');

  const fetchDocument = async () => {
    try {
      const docRef = doc(db, 'yourCollectionName', documentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchDocument();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={documentId}
          onChange={(e) => setDocumentId(e.target.value)}
          placeholder="Enter Document ID"
        />
        <button type="submit">Fetch Document</button>
      </form>
    </div>
  );
};

export default IdPage;
