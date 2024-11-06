import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { amadeusRouter } from './amadeus-routes.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/amadeus', amadeusRouter);
router.use('/api', authenticateToken, apiRoutes);

export default router;
