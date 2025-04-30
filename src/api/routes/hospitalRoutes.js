// src/api/routes/hospitalRoutes.js
import express from 'express';
import { 
  getAllHospitals,
  getHospitalQueues,
  processNextPatient,
  getPatientQueues,
  seedDummyData
} from '../controllers/hospitalController.js';
// import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Hospital routes
router.get('/', getAllHospitals);
router.get('/:id/queues', getHospitalQueues);

// Queue routes
router.post('/queues/:queueId/next', processNextPatient);
router.get('/patient/:id/queues',getPatientQueues);

// Seeding route (development only)
router.post('/seed', seedDummyData);

export default router;