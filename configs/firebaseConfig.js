// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "videogen-c9ed4.firebaseapp.com",
  projectId: "videogen-c9ed4",
  storageBucket: "videogen-c9ed4.appspot.com", // ✅ FIXED
  messagingSenderId: "143106487421",
  appId: "1:143106487421:web:9032ab3ea7ffb8a2b4ed14",
  measurementId: "G-JJ6HTXPKCY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);