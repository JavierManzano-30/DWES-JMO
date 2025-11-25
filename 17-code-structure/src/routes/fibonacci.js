const { Router } = require('express');
const { getFibonacci } = require('../controllers/fibonacci');

const router = Router();

router.get('', getFibonacci);

module.exports = router;
