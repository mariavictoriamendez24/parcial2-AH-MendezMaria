import './../css/form.scss';
import React, { useState } from 'react';
import axios from 'axios';

const AgregarDieta = () => {
  const [titulo, setTitulo] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/dietas', {
        titulo,
        ingredientes: ingredientes.split(',').map(ing => ing.trim()),
        descripcion,
      });
      setSuccess('Dieta agregada con éxito');
      setTitulo('');
      setIngredientes('');
      setDescripcion('');
      setError(''); // Clear any previous error
    } catch (error) {
      setError('Error al agregar la dieta: ' + error.message);
      setSuccess(''); // Clear any previous success message
    }
  };

  return (
    <div className="form-container">
      <h2>Agregar Dieta</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Ingredientes (separados por comas):
          <input
            type="text"
            value={ingredientes}
            onChange={(e) => setIngredientes(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Descripción:
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Agregar Dieta</button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default AgregarDieta;
