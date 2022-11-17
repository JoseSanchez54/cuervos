// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getDocs, addDoc, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyxKtR8mqZwaJ3ZZ6l9H6JCxwVBEG-Iks",
  authDomain: "basededatos-f5698.firebaseapp.com",
  projectId: "basededatos-f5698",
  storageBucket: "basededatos-f5698.appspot.com",
  messagingSenderId: "728988008302",
  appId: "1:728988008302:web:0262f02653522e2c78cb7f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export async function getMail() {
  const mailCol = collection(db, "mails");
  const mailSnapshot = await getDocs(mailCol);
  const mailList = mailSnapshot.docs.map((doc) => doc.data());
  return mailList;
}
export async function addMail(newMail, phone, nombre) {
  try {
    const docRef = await addDoc(collection(db, "mails"), {
      mail: newMail,
      phone: phone,
      nombre: nombre,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
