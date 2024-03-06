import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const AttributeTable = ({ projectId }) => {
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    const fetchAttributes = async () => {
      const attributesCollection = await db
        .collection('projects')
        .doc(projectId)
        .collection('attributes')
        .get();
      const attributesData = attributesCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAttributes(attributesData);
    };

    fetchAttributes();
  }, [projectId]);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" style={{ margin: '16px' }}>Atributos del Proyecto</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attributes.map(attribute => (
            <TableRow key={attribute.id}>
              <TableCell>{attribute.name}</TableCell>
              <TableCell>{attribute.description}</TableCell>
              <TableCell>{attribute.date.toDate().toLocaleString()}</TableCell>
              <TableCell>{attribute.completed ? 'Completado' : 'Pendiente'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttributeTable;
