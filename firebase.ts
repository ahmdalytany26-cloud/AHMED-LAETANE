
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmyBLsYydwx1DTqEKg4mwl7u7YMppEn7M",
  authDomain: "ahmed-pro-14c98.firebaseapp.com",
  projectId: "ahmed-pro-14c98",
  storageBucket: "ahmed-pro-14c98.firebasestorage.app",
  messagingSenderId: "518174817725",
  appId: "1:518174817725:web:c1f476ba5e89a7243c26d4",
  measurementId: "G-5G5KWMPLGZ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
