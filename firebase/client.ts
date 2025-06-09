import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgH6vIP8ZcaiCjGGO5FTOGvWoqrfVvFds",
  authDomain: "prep-int-007.firebaseapp.com",
  projectId: "prep-int-007",
  storageBucket: "prep-int-007.firebasestorage.app",
  messagingSenderId: "988441918785",
  appId: "1:988441918785:web:b0ecbe12b3df9d8da6b5c0",
  measurementId: "G-9FX266RC97"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);