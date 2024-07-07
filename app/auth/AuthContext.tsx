"use client"
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, firestore } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
interface AuthContextType {
  currentUser: User | null;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setCurrentUser(user);
        try {
          const userDoc = await getDoc(doc(firestore, "user", user.uid));
        } catch (error) {
          console.error("Failed to fetch user role:", error);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
