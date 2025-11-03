import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig.js";
import { fetchUserData } from "./authService.js"

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      setUser(currentUser) //sets the user as fetched from firebase
      if (currentUser) {
        const data = await fetchUserData(currentUser.uid) 
        setUserData(data) //sets the actual user data as fetched from firestore 
      } else {setUserData(null)}
      setLoading(false)
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, userData }}>
      {children}
    </AuthContext.Provider>
  );
}
