const express = require('express');
const emailRoutes = require('./email');

const router = express.Router();

router.use('/email', emailRoutes);

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

module.exports = router;
