import React, { useState } from 'react';
import { db } from '../services/firebase';
import '../styles/ProjectForm.css';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    longDescription: '',
    link: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProjectRef = await db.collection('projects').add({
        ...formData,
        userId: 'userId', // Reemplaza con el ID del usuario actual
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log('Proyecto creado con ID:', newProjectRef.id);
      // Aquí puedes realizar acciones adicionales después de crear el proyecto
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
    }
  };

  return (
    <div className="project-form-container">
      <h1>Nuevo Proyecto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="shortDescription">Descripción corta:</label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="longDescription">Descripción larga:</label>
          <textarea
            id="longDescription"
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="link">Link:</label>
          <input
            type="text"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Crear Proyecto</button>
      </form>
    </div>
  );
};

export default ProjectForm;