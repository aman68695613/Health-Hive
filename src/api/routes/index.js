// src/api/routes/index.js
import express from 'express';
import userRoutes from './userRoutes.js';
import doctorRoutes from './doctorRoutes.js';
import productRoutes from './productRoutes.js';
import hospitalRoutes from './hospitalRoutes.js';
import ambulanceRoutes from './ambulanceRoutes.js';
import { authenticate } from '../middleware/auth.js';
const router = express.Router();

// Mount all routes
router.use('/', userRoutes);
router.use('/doctors',authenticate, doctorRoutes);
router.use('/products',authenticate, productRoutes);
router.use('/hospitals',authenticate, hospitalRoutes);
router.use('/ambulances',authenticate ,ambulanceRoutes);

export default router;