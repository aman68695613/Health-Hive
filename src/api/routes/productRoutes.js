// src/api/routes/productRoutes.js
import express from 'express';
import { 
  addProduct, 
  getAllProducts 
} from '../controllers/productController.js';
// import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Product routes 
router.get('/', getAllProducts);
router.post('/', addProduct);

export default router;