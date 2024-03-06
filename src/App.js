import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ProjectList from './components/ProjectList';
import ProjectDetails from './components/ProjectDetails';
import ProjectForm from './components/ProjectForm';
//import firebase from './services/firebase';
import { auth, db } from './services/firebase'; // Cambiar esta línea
function App() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Inicializar Firebase y verificar si el usuario está autenticado
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        // Obtener los proyectos del usuario desde Firebase
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

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <ProjectList projects={projects} /> : <Login />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/new-project" element={<ProjectForm />} />
      </Routes>
    </Router>
  );
}

export default App;