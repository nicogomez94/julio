const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
const uploadDir = path.join(__dirname, '../../public/uploads');

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const name = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 20,
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Solo se permiten archivos de imagen'));
      return;
    }
    cb(null, true);
  },
});

router.post('/', requireAuth, (req, res) => {
  upload.array('images', 20)(req, res, (error) => {
    if (error) {
      const message = error.code === 'LIMIT_FILE_SIZE'
        ? 'Cada imagen debe pesar menos de 5 MB'
        : error.message || 'Error al subir imagen';
      return res.status(400).json({ error: message });
    }

    const files = req.files || [];
    if (files.length === 0) {
      return res.status(400).json({ error: 'Seleccioná al menos una imagen' });
    }

    const urls = files.map((file) => `/uploads/${file.filename}`);
    res.status(201).json({ url: urls[0], urls });
  });
});

module.exports = router;
