// src/api/routes/userRoutes.js
import express from 'express';
import { 
  createUser, 
  getAllUsers, 
  signup, 
  login, 
  logout,
  checkLoginStatus
} from '../controllers/userController.js';
// import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/create-user', createUser);
router.get('/users', getAllUsers);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/isloggedin',checkLoginStatus);

// Protected routes example
// router.get('/profile', authenticate, getUserProfile);

export default router;