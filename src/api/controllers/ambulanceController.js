
// src/api/controllers/ambulanceController.js
import { Ambulance, Booking } from '../models/index.js';
import { getIo } from '../socket/socketManager.js';
import { moveAmbulanceTowardsUser } from '../services/ambulanceService.js';

// In-memory store for ambulance locations
const ambulanceLocations = new Map();

export const getAllAmbulances = async (req, res) => {
  try {
    const ambulances = await Ambulance.findMany();
    res.json(ambulances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching ambulances" });
  }
};

export const bookAmbulance = async (req, res) => {
  const { ambulanceId, userId, userLocation } = req.body;

  try {
    // Check if ambulance exists
    const ambulance = await Ambulance.findUnique({ where: { id: ambulanceId } });
    if (!ambulance) {
      return res.status(404).json({ error: "Ambulance not found" });
    }

    // Create booking record
    const booking = await Booking.create({
      data: { ambulanceId, userId, status: "booked" },
    });

    // Get random starting location near user
    const randomStart = {
      lat: userLocation.lat - 0.01 + Math.random() * 0.02,
      lng: userLocation.lng - 0.01 + Math.random() * 0.02,
    };
    
    // Start moving ambulance
    const io = getIo();
    moveAmbulanceTowardsUser(io, ambulanceId, randomStart, userLocation);
    
    res.status(201).json({ message: "Ambulance booked successfully", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error booking ambulance" });
  }
};

export const getAmbulanceLocation = (req, res) => {
  const { ambulanceId } = req.params;
  const location = ambulanceLocations.get(ambulanceId);
  
  res.json(location || { error: "Location not available" });
};

export const updateAmbulanceLocation = (ambulanceId, lat, lng) => {
  ambulanceLocations.set(ambulanceId, { lat, lng });
};

export const getAmbulanceLocations = () => {
  return ambulanceLocations;
};