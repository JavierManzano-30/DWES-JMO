const { Router } = require('express');
const notesRoutes = require('./notes');
const accessRoutes = require('./access');
const externalRoutes = require('./external');

const router = Router();

router.use('/notes', notesRoutes);
router.use('/external', externalRoutes);
router.use('/', accessRoutes);

module.exports = router;
