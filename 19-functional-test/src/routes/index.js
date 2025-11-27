const { Router } = require('express');
const pingRoutes = require('./ping');
const odataRoutes = require('./odata');

const router = Router();

router.use('/ping', pingRoutes);
router.use('/', odataRoutes);

module.exports = router;
