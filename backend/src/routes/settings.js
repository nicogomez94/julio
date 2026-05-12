const express      = require('express');
const { PrismaClient } = require('@prisma/client');
const { requireAuth }  = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// GET all settings as key-value object (public)
router.get('/', async (req, res) => {
  try {
    const rows   = await prisma.setting.findMany();
    const result = {};
    rows.forEach((s) => { result[s.key] = s.value; });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener configuración' });
  }
});

// PUT bulk update settings (admin)
router.put('/', requireAuth, async (req, res) => {
  try {
    const updates = req.body; // { key: value, ... }
    const ops = Object.entries(updates).map(([key, value]) =>
      prisma.setting.upsert({
        where:  { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      })
    );
    await Promise.all(ops);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar configuración' });
  }
});

module.exports = router;
