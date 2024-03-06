import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../services/firebase';
import AttributeTable from './AttributeTable';
import { Paper, Typography, CircularProgress } from '@mui/material';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const projectDoc = await db.collection('projects').doc(id).get();
      if (projectDoc.exists) {
        setProject({ id: projectDoc.id, ...projectDoc.data() });
      } else {
        console.error('Proyecto no encontrado');
      }
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return <CircularProgress />;
  }

  return (
    <Paper style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h4">{project.title} (ID: {project.id})</Typography>
      <Typography variant="body1">{project.longDescription}</Typography>
      <AttributeTable projectId={project.id} />
    </Paper>
  );
};

export default ProjectDetails;
