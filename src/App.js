import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ProjectList from './components/ProjectList';
import ProjectDetails from './components/ProjectDetails';
import ProjectForm from './components/ProjectForm';
import { auth, db } from './services/firebase';
import Logout from './components/Logout';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {Button} from '@mui/material';

function App() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [openForm, setOpenForm] = useState(false);

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

  const handleOpenForm = () => {setOpenForm(true);};

  const handleCloseForm = () => {setOpenForm(false);};

  return (
    <Router>
      {user && (
        <>
          <Logout />
          <Button variant="contained" onClick={handleOpenForm} style={{ margin: '20px' }}>Añadir Proyecto</Button>
      <ProjectForm open={openForm} onClose={handleCloseForm} /> </>
      )}
      <Routes>
        <Route path="/" element={user ? <ProjectList projects={projects} /> : <Login />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
