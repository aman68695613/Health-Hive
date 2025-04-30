// src/api/services/ambulanceService.js
import axios from 'axios';

/**
 * Simulates an ambulance moving towards a user location
 * 
 * @param {object} io - Socket.io instance
 * @param {string} ambulanceId - ID of the ambulance
 * @param {object} start - Starting coordinates {lat, lng}
 * @param {object} end - Destination coordinates {lat, lng}
 * @param {number} durationMs - Duration of the journey in milliseconds
 */
export async function moveAmbulanceTowardsUser(io, ambulanceId, start, end, durationMs = 60000) {
  try {
    // Fetch route coordinates using OSRM
    const url = `http://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;
    const res = await axios.get(url);

    const coords = res.data.routes[0].geometry.coordinates;
    const steps = coords.length;
    const intervalTime = durationMs / steps;

    let step = 0;

    const interval = setInterval(() => {
      if (step >= steps) {
        // We've reached the destination
        clearInterval(interval);
        
        // Emit final location
        io.emit("ambulanceLocationUpdate", {
          ambulanceId,
          lat: end.lat,
          lng: end.lng,
          status: "arrived"
        });
        
        return;
      }

      // Get current position
      const [lng, lat] = coords[step];

      // Emit update
      io.emit("ambulanceLocationUpdate", {
        ambulanceId,
        lat,
        lng,
        status: "en-route"
      });

      step++;
    }, intervalTime);
    
    return interval; // Return interval ID for potential cancellation
  } catch (err) {
    console.error("Error fetching route from OSRM:", err.message);
    
    // Fallback to straight-line movement if route planning fails
    simulateStraightMovement(io, ambulanceId, start, end, durationMs);
  }
}

/**
 * Fallback function to simulate straight-line movement if OSRM fails
 */
function simulateStraightMovement(io, ambulanceId, start, end, durationMs) {
  const steps = 20; // Number of updates to send
  const intervalTime = durationMs / steps;
  
  let step = 0;
  
  const interval = setInterval(() => {
    if (step >= steps) {
      clearInterval(interval);
      
      io.emit("ambulanceLocationUpdate", {
        ambulanceId,
        lat: end.lat,
        lng: end.lng,
        status: "arrived"
      });
      
      return;
    }
    
    // Calculate position on straight line
    const progress = step / steps;
    const lat = start.lat + (end.lat - start.lat) * progress;
    const lng = start.lng + (end.lng - start.lng) * progress;
    
    io.emit("ambulanceLocationUpdate", {
      ambulanceId,
      lat,
      lng,
      status: "en-route"
    });
    
    step++;
  }, intervalTime);
}