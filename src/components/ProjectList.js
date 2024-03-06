import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Link,
  Box,
  Link as RouterLink,
} from '@mui/material';

const ProjectList = ({ projects}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
      <TableContainer component={Paper}>
        <h1>Mis Proyectos</h1>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Fecha de creación</TableCell>
              <TableCell>Última modificación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.id}</TableCell>
                <TableCell>
                  <Link component={RouterLink} to={`/projects/${project.id}`}>
                    {project.title}
                  </Link>
                </TableCell>
                <TableCell>{project.shortDescription}</TableCell>
                <TableCell>
                  {project.link ? (
                    <Link href={project.link} target="_blank" rel="noopener noreferrer">
                      Link
                    </Link>
                  ) : '-'}
                </TableCell>
                <TableCell>{project.createdAt.toDate().toLocaleString()}</TableCell>
                <TableCell>{project.updatedAt.toDate().toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProjectList;
