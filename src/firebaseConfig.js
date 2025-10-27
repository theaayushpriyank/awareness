// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcnKBXOO1KMfzpcOJ9ozcmyOjOM2pjh6k",
  authDomain: "awareness-9920d.firebaseapp.com",
  projectId: "awareness-9920d",
  storageBucket: "awareness-9920d.firebasestorage.app",
  messagingSenderId: "515690941649",
  appId: "1:515690941649:web:13995b3c0fff72cce4c9f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)