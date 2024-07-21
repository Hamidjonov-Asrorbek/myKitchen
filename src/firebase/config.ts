import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCKyM3Y8CaLQYT1e7a09PnAgR7HDNtB3o8",
  authDomain: "oy-imtixon.firebaseapp.com",
  projectId: "oy-imtixon",
  storageBucket: "oy-imtixon.appspot.com",
  messagingSenderId: "981957590671",
  appId: "1:981957590671:web:8acd642014defefea3bafa",
};

export const provider = new GoogleAuthProvider();
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
