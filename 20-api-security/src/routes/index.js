const { Router } = require('express');
const { authenticate, requireRole } = require('../middleware/auth');
const { publicAccess, vipAccess, adminAccess } = require('../controllers/access');

const router = Router();

router.get('/public', publicAccess);
router.get('/vip', authenticate, vipAccess);
router.get('/admin', authenticate, requireRole('admin'), adminAccess);

module.exports = router;
