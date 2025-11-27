const { Router } = require('express');
const { getRoot, getBooks } = require('../controllers/odata');

const router = Router();

router.get('/', getRoot);
router.get('/odata/books', getBooks);

module.exports = router;
