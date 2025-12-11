const { Router } = require('express');
const uploadRouter = require('./upload');
const listRouter = require('./list');

const router = Router();

router.use('/upload', uploadRouter);
router.use('/files', listRouter);

router.get('/', (req, res) => {
  res.json({ message: 'API de ficheros', endpoints: ['/upload', '/files', '/download/:name'] });
});

module.exports = router;
