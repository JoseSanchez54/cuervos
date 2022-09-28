import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDjSUekHiXeNGrCkpAe3qkwc99pm-DD6n4",
  authDomain: "printly-805b3.firebaseapp.com",
  projectId: "printly-805b3",
  storageBucket: "printly-805b3.appspot.com",
  messagingSenderId: "948150477966",
  appId: "1:948150477966:web:0326d0c05a0be1f12bd5df",
  measurementId: "G-SQ2PP1VPC2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
