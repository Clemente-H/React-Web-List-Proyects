import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button, Typography, Paper } from '@mui/material';
import { auth } from '../services/firebase';
import '../styles/Login.css';

const Login = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <Paper elevation={3} style={{ padding: '40px', maxWidth: '400px', margin: '100px auto' }}>
      <Typography variant="h4" gutterBottom>Iniciar sesión</Typography>
      <Button variant="contained" color="primary" onClick={signInWithGoogle}>
        Ingresar con Google
      </Button>
    </Paper>
  );
};

export default Login;
