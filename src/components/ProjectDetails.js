import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../services/firebase';
import AttributeTable from './AttributeTable';
import '../styles/ProjectDetails.css';

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

  return (
    <div className="project-details-container">
      {project ? (
        <>
          <h1>{project.title} (ID: {project.id})</h1>
          <p>{project.longDescription}</p>
          <AttributeTable projectId={project.id} />
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default ProjectDetails;