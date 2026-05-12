const express      = require('express');
const { PrismaClient } = require('@prisma/client');
const { requireAuth }  = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// GET all products (public)
router.get('/', async (req, res) => {
  try {
    const { categoryId, featured, active } = req.query;
    const where = {};
    if (categoryId) where.categoryId = parseInt(categoryId);
    if (featured !== undefined) where.featured = featured === 'true';
    // default: only active, unless explicitly requested
    where.active = active !== undefined ? active === 'true' : true;

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// GET single product (public)
router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { category: true },
    });
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

// POST create product (admin)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { name, description, price, imageUrl, badge, featured, active, categoryId } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        description: description || null,
        price: parseFloat(price),
        imageUrl: imageUrl || null,
        badge: badge || null,
        featured: !!featured,
        active: active !== false,
        categoryId: parseInt(categoryId),
      },
      include: { category: true },
    });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

// PUT update product (admin)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { name, description, price, imageUrl, badge, featured, active, categoryId } = req.body;
    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        description: description || null,
        price: parseFloat(price),
        imageUrl: imageUrl || null,
        badge: badge || null,
        featured: !!featured,
        active: !!active,
        categoryId: parseInt(categoryId),
      },
      include: { category: true },
    });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// DELETE product (admin)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

module.exports = router;
