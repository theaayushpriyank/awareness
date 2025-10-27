import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import {doc, getDoc, setDoc} from "firebase/firestore"
import { db, auth } from "./firebaseConfig.js"



// Signup
export async function signup(email, password) {
  const  userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user

  setDoc(doc(db, "users", user.uid), {
    email: user.email,
    createdAt: Date.now()
  })
  return user
}

// Login
export async function login(email, password) {
 return await signInWithEmailAndPassword(auth, email, password);
}

export async function fetchUserData(userId) {
  const userData = await getDoc(doc(db, "users", userId))
  if (userData) {return userData.data()}
  else return null
}

// Logout
export async function logout() {
  return await signOut(auth);
}