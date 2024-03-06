import React from 'react';
import { auth } from '../services/firebase';
import '../styles/Login.css';
//import firebase from '../services/firebase';

const Login = () => {
  const signInWithGoogle = () => {
    const provider = new auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
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