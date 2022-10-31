// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getEnviroments } from "../helpers/getEnviroments";


const {
  VITE_apiKey,
  VITE_authDomain,
  VITE_projectId,
  VITE_storageBucket,
  VITE_messagingSenderId,
  VITE_appId,
} = getEnviroments()



// Your web app's Firebase configuration
// Produccion
// const firebaseConfig = {
//   apiKey: "AIzaSyCmVBC30GdUHQ3uVijSHzOa9kySJTVBrHc",
//   authDomain: "journal-app-aab7f.firebaseapp.com",
//   projectId: "journal-app-aab7f",
//   storageBucket: "journal-app-aab7f.appspot.com",
//   messagingSenderId: "506838868036",
//   appId: "1:506838868036:web:44110f4ed7a2c8e30adc11"
// };

// testing
const firebaseConfig = {
  apiKey: "AIzaSyCorlX0j7S4sZYmwYrw2RJdHyHPh5cXWnk",
  authDomain: "testing-journalapp-64f43.firebaseapp.com",
  projectId: "testing-journalapp-64f43",
  storageBucket: "testing-journalapp-64f43.appspot.com",
  messagingSenderId: "608096631558",
  appId: "1:608096631558:web:b7e9bd6c8fe26d83a87c87"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB   = getFirestore(FirebaseApp) 