import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProjectList.css';

const ProjectList = ({ projects }) => {
  return (
    <div className="project-list-container">
      <h1>Mis Proyectos</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Link</th>
            <th>Fecha de creación</th>
            <th>Última modificación</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>
                <Link to={`/projects/${project.id}`}>{project.title}</Link>
              </td>
              <td>{project.shortDescription}</td>
              <td>
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    Link
                  </a>
                ) : (
                  '-'
                )}
              </td>
              <td>{project.createdAt.toDate().toLocaleString()}</td>
              <td>{project.updatedAt.toDate().toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>Nuevo Proyecto</button>
    </div>
  );
};

export default ProjectList;