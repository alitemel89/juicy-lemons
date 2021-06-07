import React, { useContext, useState, useEffect } from "react";
import { auth } from '../utils/FirebaseUtils';


const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [ currentUser, setCurrentUser ] = useState(null);

  function signup(email, password) {
      return auth.createUserWithEmailAndPassword(email, password)
  }

  const unsubscribeFromAuth = () => null;

  function login(email, password)  {
      auth.signInWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    auth.onAuthStateChanged(user => setCurrentUser(user))

    return () => unsubscribeFromAuth();
  }, [])


  const value = {
      currentUser,
      signup,
      login
  }

  return (
     <AuthContext.Provider value={value}>
         { children }
     </AuthContext.Provider>
  )
};


export default AuthContext;