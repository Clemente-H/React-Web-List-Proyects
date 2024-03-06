import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { db } from '../services/firebase';
import { useUser } from './UserContext';

const ProjectForm = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    longDescription: '',
    link: '',
  });
  const { currentUser } = useUser();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.shortDescription || !formData.longDescription || !formData.link) {
      alert("Please fill all the fields.");
      return;
    }
    try {
      await db.collection('projects').add({
        ...formData,
        userId: currentUser.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      onClose(); // Close the dialog on successful addition
      setFormData({ title: '', shortDescription: '', longDescription: '', link: '' }); // Reset the form
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New Project</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            label="Título"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Descripción Corta"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            margin="normal"
            multiline
          />
          <TextField
            fullWidth
            label="Descripción Larga"
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            margin="normal"
            multiline
          />
          <TextField
            fullWidth
            label="Link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProjectForm;
