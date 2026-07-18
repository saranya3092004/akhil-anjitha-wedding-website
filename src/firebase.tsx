// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQ4lZgkiJb4NWDQIZuxPju54vwJ08sDJ0",
  authDomain: "akhil-anjitha-marriage.firebaseapp.com",
  projectId: "akhil-anjitha-marriage",
  storageBucket: "akhil-anjitha-marriage.firebasestorage.app",
  messagingSenderId: "655696871282",
  appId: "1:655696871282:web:e7d60a5e368ca1eb2167eb",
  measurementId: "G-SFJ1K12FH5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);