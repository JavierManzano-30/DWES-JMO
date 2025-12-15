const { Router } = require('express');
const uploadMiddleware = require('../upload');

const router = Router();

router.post('/', uploadMiddleware.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se recibio fichero' });
  }
  return res.status(201).json({
    message: 'Fichero subido',
    file: {
      originalName: req.file.originalname,
      storedName: req.file.filename,
      size: req.file.size,
      mimeType: req.file.mimetype,
      path: req.file.path,
    },
  });
});

module.exports = router;
