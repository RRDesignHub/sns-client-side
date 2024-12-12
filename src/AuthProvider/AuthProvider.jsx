import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import auth from "../Firebase/firebase.init";


export const AuthContext = createContext(null);


export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const userLogin = (email, password) =>{
    setLoader(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logoutUser = ()=>{
    setLoader(true);
    return signOut(auth);
  }

  useEffect(() => {
    const currentSubscriber = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(false);
    });
    return () => {
      currentSubscriber();
    };
  }, []);
  
  const authInfo = {
    userLogin, user, setUser, loader , setLoader, logoutUser
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}
