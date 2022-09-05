import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
const firebaseConfig = {
  apiKey: "AIzaSyDjSUekHiXeNGrCkpAe3qkwc99pm-DD6n4",
  authDomain: "printly-805b3.firebaseapp.com",
  projectId: "printly-805b3",
  storageBucket: "printly-805b3.appspot.com",
  messagingSenderId: "948150477966",
  appId: "1:948150477966:web:0326d0c05a0be1f12bd5df",
  measurementId: "G-SQ2PP1VPC2",
};

export const app = initializeApp(firebaseConfig);

export async function getCities(db) {
  const citiesCol = collection(db, "cities");
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}
