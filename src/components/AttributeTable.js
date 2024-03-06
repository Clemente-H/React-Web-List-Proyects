import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import '../styles/AttributeTable.css';

const AttributeTable = ({ projectId }) => {
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    const fetchAttributes = async () => {
      const attributesCollection = await db
        .collection('projects')
        .doc(projectId)
        .collection('attributes')
        .get();
      const attributesData = attributesCollection.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAttributes(attributesData);
    };

    fetchAttributes();
  }, [projectId]);

  return (
    <div className="attribute-table-container">
      <h2>Atributos del Proyecto</h2>
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
          {attributes.map((attribute) => (
            <tr key={attribute.id}>
              <td>{attribute.name}</td>
              <td>{attribute.description}</td>
              <td>{attribute.date.toDate().toLocaleString()}</td>
              <td>{attribute.completed ? 'Completado' : 'Pendiente'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttributeTable;