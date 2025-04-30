// src/api/routes/ambulanceRoutes.js
import express from 'express';
import { 
  getAllAmbulances,
  bookAmbulance,
  getAmbulanceLocation
} from '../controllers/ambulanceController.js';
// import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Ambulance routes
router.get('/', getAllAmbulances);
router.post('/book', bookAmbulance);
router.get('/location/:ambulanceId', getAmbulanceLocation);

export default router;