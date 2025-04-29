// src/api/controllers/doctorController.js
import prisma, { Doctor } from '../models/index.js';

export const addDoctor = async (req, res) => {
  const { name, speciality, fee, image } = req.body;
  
  if (!name || !speciality || !fee) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const doctor = await Doctor.create({
      data: {
        name,
        speciality,
        fee: parseFloat(fee),
        image
      }
    });
    
    res.status(201).json({ message: 'Doctor added successfully', doctor });
  } catch (error) {
    console.error('Error adding doctor:', error);
    res.status(500).json({ error: 'Error adding doctor' });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findMany({
      include: {
        Review: true,
        Surgery: true
      }
    });
    
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error.message, error.stack);
    res.status(500).json({ error: 'Error fetching doctors' });
  }
};

export const addSurgery = async (req, res) => {
  const { name, description, cost, doctorId } = req.body;
  
  try {
    const surgery = await prisma.surgery.create({
      data: {
        name,
        description,
        cost: parseFloat(cost),
        doctorId
      }
    });
    
    res.status(201).json({ message: 'Surgery added successfully', surgery });
  } catch (error) {
    console.error('Error adding surgery:', error);
    res.status(500).json({ error: 'Error adding surgery' });
  }
};

export const addReview = async (req, res) => {
  const { rating, text, userId, doctorId } = req.body;

  try {
    // Create the review
    const review = await prisma.review.create({
      data: {
        rating,
        text,
        userId,
        doctorId
      }
    });

    // Calculate the new average rating for the doctor
    const { _avg } = await prisma.review.aggregate({
      where: { doctorId },
      _avg: { rating: true }
    });

    const averageRating = _avg.rating || 0;

    res.status(201).json({ 
      message: 'Review added successfully', 
      review, 
      averageRating 
    });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Error adding review' });
  }
};