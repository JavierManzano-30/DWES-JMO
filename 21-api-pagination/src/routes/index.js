const { Router } = require('express');
const { getNotes } = require('../controllers/notes');
const accessRoutes = require('./access');

const router = Router();

router.get('/notes', getNotes);
router.use('/', accessRoutes);

module.exports = router;
