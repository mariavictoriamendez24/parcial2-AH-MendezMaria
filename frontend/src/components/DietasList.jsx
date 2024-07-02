// DietasList.jsx
import './../css/dietas.scss'; 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DietasList = () => {
  const [dietas, setDietas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDietas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/dietas');
        setDietas(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar las dietas');
        setLoading(false);
      }
    };

    fetchDietas();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/dietas/${id}`);
      setDietas(dietas.filter(dieta => dieta._id !== id));
    } catch (error) {
      setError('Error al eliminar la dieta');
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="dietas-list-container">
      <h2>Lista de Dietas</h2>
      {dietas.length === 0 ? (
        <p>No hay dietas disponibles.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Ingredientes</th>
              <th>Descripción</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {dietas.map(dieta => (
              <tr key={dieta._id}>
                <td>{dieta.titulo}</td>
                <td>{dieta.ingredientes.join(', ')}</td>
                <td>{dieta.descripcion}</td>
                <td>
                  <Link to={`/editar-dieta/${dieta.titulo}`} className="button is-info">
                    Editar
                  </Link>
                </td>
                <td>
                  <button onClick={() => handleDelete(dieta._id)} className="button is-danger">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default DietasList;
