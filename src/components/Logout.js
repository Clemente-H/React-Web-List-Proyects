import React from 'react';
import { Button } from '@mui/material';
import { auth } from '../services/firebase'; // Asegúrate de que la ruta sea correcta

const Logout = () => {
  const logout = () => {
    auth.signOut();
  };

  return (
    <div style={{ position: 'fixed', left: 20, bottom: 20 }}>
      <Button variant="contained" color="secondary" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
