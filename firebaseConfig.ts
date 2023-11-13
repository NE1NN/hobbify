// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARjhRYt-SLUz-OGMWq3oBD1z6edtY-1Rw",
  authDomain: "hobbify-d2495.firebaseapp.com",
  projectId: "hobbify-d2495",
  storageBucket: "hobbify-d2495.appspot.com",
  messagingSenderId: "329199747284",
  appId: "1:329199747284:web:db3fec47f0aa7d68e23b41",
  measurementId: "G-EJTFYE8F9P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
