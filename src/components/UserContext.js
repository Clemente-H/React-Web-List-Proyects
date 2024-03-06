import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../services/firebase'; // Asegúrate de tener esta importación correcta

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setCurrentUser);
    return unsubscribe; // Esto es para limpiar la suscripción cuando el componente se desmonte
  }, []);

  return <UserContext.Provider value={{ currentUser }}>{children}</UserContext.Provider>;
};
