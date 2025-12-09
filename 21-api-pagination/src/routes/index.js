const { Router } = require('express');
const { getNotes } = require('../controllers/notes');

const router = Router();

router.get('/notes', getNotes);

module.exports = router;
