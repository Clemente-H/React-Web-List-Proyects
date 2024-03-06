import React, { useState, useContext } from 'react'; // Asumiendo que usas un contexto para el usuario
import { db } from '../services/firebase';
import { Modal, Box, Container, TextField, Button, Typography } from '@mui/material';
//import { UserContext } from './UserContext'; // Esto es hipotético, ajusta según cómo manejes el estado del usuario
import { useUser } from './UserContext'; // Asegúrate de que la ruta sea correcta

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ProjectForm = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    longDescription: '',
    link: '',
  });
  //const { currentUser } = useContext(UserContext); // Asume que el ID del usuario se guarda aquí
  const { currentUser } = useUser();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.collection('projects').add({
        ...formData,
        userId: currentUser.uid, // Usa el ID del usuario actual
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      handleClose(); // Cierra el modal tras una adición exitosa
      setFormData({ title: '', shortDescription: '', longDescription: '', link: '' }); // Restablece el formulario
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="project-form-modal-title" aria-describedby="project-form-modal-description">
      <Box sx={style}>
        <Container maxWidth="sm">
          <Typography id="project-form-modal-title" variant="h6" component="h2" gutterBottom>Nuevo Proyecto</Typography>
          <form onSubmit={handleSubmit}>
            {/* Campos del formulario */}
          </form>
        </Container>
      </Box>
    </Modal>
  );
};

export default ProjectForm;
