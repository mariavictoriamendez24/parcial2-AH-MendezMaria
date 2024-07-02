import express from 'express';
import { getDietas, createDietas, updateDietas, deleteDietas } from '../controllers/dietas_controller.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const dietas = await getDietas();
  res.json(dietas);
});

router.post('/', async (req, res) => {
  const nuevaDieta = await createDietas(req.body);
  res.json(nuevaDieta);
});

router.put('/:titulo', async (req, res) => {
  const dietaActualizada = await updateDietas(req.body, req.params.titulo);
  res.json(dietaActualizada);
});

router.delete('/:id', async (req, res) => {
  const dietaEliminada = await deleteDietas(req.params.id);
  res.json(dietaEliminada);
});

export default router;
