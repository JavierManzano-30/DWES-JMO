const { Router } = require('express');
const { getBooks, getRoot } = require('../controllers/odata');

const router = Router();

router.get('/', getRoot);
router.get('/odata/books', getBooks);

module.exports = router;
