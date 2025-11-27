const { Router } = require('express');
const odataRoutes = require('./odata');

const router = Router();

router.use('/', odataRoutes);

module.exports = router;
