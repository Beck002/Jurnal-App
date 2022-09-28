// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmVBC30GdUHQ3uVijSHzOa9kySJTVBrHc",
  authDomain: "journal-app-aab7f.firebaseapp.com",
  projectId: "journal-app-aab7f",
  storageBucket: "journal-app-aab7f.appspot.com",
  messagingSenderId: "506838868036",
  appId: "1:506838868036:web:44110f4ed7a2c8e30adc11"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB   = getFirestore(FirebaseApp) 