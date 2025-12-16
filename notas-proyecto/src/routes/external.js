const { Router } = require('express');
const { getExternalFact } = require('../controllers/external');

const router = Router();

router.get('/fact', getExternalFact);

module.exports = router;
