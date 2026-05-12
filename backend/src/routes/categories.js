const express      = require('express');
const { PrismaClient } = require('@prisma/client');
const { requireAuth }  = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// GET all categories (public)
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

// POST create category (admin)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { name, slug } = req.body;
    const category = await prisma.category.create({ data: { name, slug } });
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'La categoría ya existe' });
    }
    res.status(500).json({ error: 'Error al crear categoría' });
  }
});

// PUT update category (admin)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { name, slug } = req.body;
    const category = await prisma.category.update({
      where: { id: parseInt(req.params.id) },
      data: { name, slug },
    });
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar categoría' });
  }
});

// DELETE category (admin)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.category.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'No se puede eliminar: la categoría tiene productos asociados' });
    }
    res.status(500).json({ error: 'Error al eliminar categoría' });
  }
});

module.exports = router;
