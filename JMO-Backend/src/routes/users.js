// Rutas de la API: conectan endpoint, middlewares y controlador.
import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { createImageUpload } from '../utils/upload.js';
import { getMe, updateMe } from '../controllers/usersController.js';

const router = Router();
const upload = createImageUpload();

router.get('/me', authenticate, asyncHandler(getMe));

router.patch('/me', authenticate, upload.single('avatar'), asyncHandler(updateMe));

export default router;
