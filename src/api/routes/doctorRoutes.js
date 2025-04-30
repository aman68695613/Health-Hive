// src/api/routes/doctorRoutes.js
import express from 'express';
import { 
  addDoctor, 
  getAllDoctors, 
  addSurgery, 
  addReview 
} from '../controllers/doctorController.js';
// import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Doctor routes
router.get('/', getAllDoctors);
router.post('/', addDoctor);

// Surgery routes
router.post('/surgeries', addSurgery);

// Review routes
router.post('/reviews', addReview);

export default router;