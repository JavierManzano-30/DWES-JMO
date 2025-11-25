const { Router } = require('express');

const pingRoutes = require('./ping');
const fibonacciRoutes = require('./fibonacci');

const router = Router();

router.use('/ping', pingRoutes);
router.use('/fibonacci', fibonacciRoutes);

module.exports = router;
