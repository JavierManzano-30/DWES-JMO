const { Router } = require('express');
const notesRoutes = require('./notes');
const accessRoutes = require('./access');

const router = Router();

router.use('/notes', notesRoutes);
router.use('/', accessRoutes);

module.exports = router;
