import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import firebaseConfig from './firebaseConfig';

const firestore = firebase.firestore();

// Componente para la pantalla de Login
const LoginScreen = ({ onLogin }) => {
  const handleLogin = (response) => {
    // Manejar la respuesta del inicio de sesión con Google
    onLogin(response.profileObj);
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <GoogleLogin
        clientId="TU_CLIENTE_ID_DE_GOOGLE"
        buttonText="Iniciar sesión con Google"
        onSuccess={handleLogin}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

// Componente para el formulario de nuevo proyecto
const NewProjectForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, shortDescription, link });
    setTitle('');
    setShortDescription('');
    setLink('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción corta"
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enlace (opcional)"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button type="submit">Guardar</button>
    </form>
  );
};

// Componente para la tabla de atributos del proyecto
const ProjectAttributesTable = ({ attributes }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Fecha</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {attributes.map((attr) => (
          <tr key={attr.name}>
            <td>{attr.name}</td>
            <td>{attr.description}</td>
            <td>{attr.date.toLocaleDateString()}</td>
            <td>{attr.completed ? 'Completado' : 'En progreso'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Componente para la página del proyecto
const ProjectPage = ({ project }) => {
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    // Aquí deberías cargar los atributos del proyecto desde una API o una base de datos
    setAttributes([
      {
        name: 'Atributo 1',
        description: 'Descripción del atributo 1',
        date: new Date(),
        completed: true,
      },
      {
        name: 'Atributo 2',
        description: 'Descripción del atributo 2',
        date: new Date(),
        completed: false,
      },
    ]);
  }, []);

  return (
    <div>
      <h2>{project.title} (ID: {project.id})</h2>
      <p>{project.longDescription}</p>
      <ProjectAttributesTable attributes={attributes} />
    </div>
  );
};

const getUserProjects = async (userId) => {
  const projectsSnapshot = await firestore
    .collection('users')
    .doc(userId)
    .collection('projects')
    .get();

  const projects = projectsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return projects;
};

// Componente principal de la aplicación
const App = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleLogin = async (userData) => {
    setUser(userData);
    const userId = userData.googleId; // Asume que userData.googleId es el ID de usuario de Google
    const projects = await getUserProjects(userId);
    setProjects(projects);
  };

  const handleNewProject = async (newProject) => {
    const userId = user.googleId; // Asume que user.googleId es el ID de usuario de Google
    const now = new Date();
    const newProjectData = {
      ...newProject,
      createdAt: now,
      updatedAt: now,
      longDescription: '',
    };
  
    await firestore
      .collection('users')
      .doc(userId)
      .collection('projects')
      .add(newProjectData);
  
    const projects = await getUserProjects(userId);
    setProjects(projects);
    setShowNewProjectForm(false);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Proyectos</h1>
          <button onClick={() => setShowNewProjectForm(true)}>Nuevo proyecto</button>
          {showNewProjectForm && (
            <NewProjectForm onSubmit={handleNewProject} />
          )}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Descripción corta</th>
                <th>Enlace</th>
                <th>Fecha de creación</th>
                <th>Última modificación</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td>
                    <a href="#" onClick={() => handleProjectClick(project)}>
                      {project.title}
                    </a>
                  </td>
                  <td>{project.shortDescription}</td>
                  <td>{project.link}</td>
                  <td>{project.createdAt.toLocaleDateString()}</td>
                  <td>{project.updatedAt.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedProject && (
            <ProjectPage project={selectedProject} />
          )}
        </div>
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;