import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ProjectList from './components/ProjectList';
import ProjectDetails from './components/ProjectDetails';
import ProjectForm from './components/ProjectForm';
import { auth, db } from './services/firebase';
import { Modal } from '@mui/material';
import Logout from './components/Logout';

function App() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        db.collection('projects').where('userId', '==', user.uid).get()
          .then((querySnapshot) => {
            const projectsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setProjects(projectsData);
          })
          .catch((error) => {
            console.error('Error al obtener los proyectos:', error);
          });
      } else {
        setUser(null);
        setProjects([]);
      }
    });

    return unsubscribe;
  }, []);

  const handleOpenProjectForm = () => setIsProjectFormOpen(true);
  const handleCloseProjectForm = () => setIsProjectFormOpen(false);

  return (
    <Router>
      {user && <Logout/>}
      <Routes>
        <Route path="/" element={user ? <ProjectList projects={projects} onAddNewProject={handleOpenProjectForm} /> : <Login />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
      </Routes>
      <Modal
        open={isProjectFormOpen}
        onClose={handleCloseProjectForm}
        aria-labelledby="project-form-modal-title"
        aria-describedby="project-form-modal-description"
      >
        <ProjectForm onClose={handleCloseProjectForm} />
      </Modal>
    </Router>
  );
}

export default App;
