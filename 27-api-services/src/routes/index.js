const express = require('express');
const externalRoutes = require('./external');

const router = express.Router();

router.use('/external', externalRoutes);

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

module.exports = router;
