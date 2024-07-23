import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { Persona } from "@/Interfaces/IPersona";

export const registrarPersona = async(persona:Persona)=>{
    const docRef = await addDoc(collection(db, "personas"), persona);
}

export const obtenerPersonas = async()=>{
    let personas:Persona[] = []
    const querySnapshot = await getDocs(collection(db, "personas"));
    querySnapshot.forEach((doc) => {
        let persona:Persona = {
            rut:doc.data().rut,
            apellido:doc.data().apellido,
            correo:doc.data().correo,
            edad:doc.data().edad,
            fechaNacimiento:doc.data().fechaNacimiento,
            nombre:doc.data().nombre,
            key:doc.id
        }
        personas.push(persona)
    });
    return personas
}
export const obtenerPersona = async(key:string)=>{
    const docRef = doc(db, "personas", key);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let persona:Persona = {
            rut:docSnap.data().rut,
            apellido:docSnap.data().apellido,
            correo:docSnap.data().correo,
            edad:docSnap.data().edad,
            fechaNacimiento:docSnap.data().fechaNacimiento,
            nombre:docSnap.data().nombre,
            key:docSnap.id
        }
        return persona
    } else {
      return undefined
    }
}
export const actualizarPersona = async(p:Persona)=>{
    const ref = doc(collection(db,"personas",p.key!))
    await updateDoc(ref,{...p})
}