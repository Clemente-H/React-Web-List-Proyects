import React from 'react';
import { auth } from '../services/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import '../styles/Login.css';

const Login = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div className="login-container">
      <h1>Iniciar sesión</h1>
      <button className="login-button" onClick={signInWithGoogle}>
        Ingresar con Google
      </button>
    </div>
  );
};

export default Login;
