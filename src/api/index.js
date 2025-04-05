/* eslint-disable no-undef */
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import http from "http"; // ✅ Required for WebSockets
import axios from "axios"; // ✅ Add at top
import { Server } from "socket.io"; // ✅ WebSocket server
const app = express();


app.use(cors({
  credentials: true,
  origin:"http://localhost:5173"
}))
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});
app.use(cookieParser());
app.use(express.json());

// eslint-disable-next-line no-undef
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const PORT=process.env.PORT||3000;
const prisma = new PrismaClient()


// ✅ Store ambulance locations (In-memory for now)
const ambulanceLocations = new Map();

/* ✅ ADD THIS: Simulated movement function */
async function moveAmbulanceTowardsUser(io, ambulanceId, start, end, durationMs = 60000) {
  try {
    // 🧭 Step 1: Fetch route coordinates using OSRM
    const url = `http://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;
    const res = await axios.get(url);

    const coords = res.data.routes[0].geometry.coordinates;
    const steps = coords.length;
    const intervalTime = durationMs / steps;

    let step = 0;

    const interval = setInterval(() => {
      if (step >= steps) {
        clearInterval(interval);
        return;
      }

      const [lng, lat] = coords[step];

      io.emit("ambulanceLocationUpdate", {
        ambulanceId,
        lat,
        lng,
      });

      step++;
    }, intervalTime);
  } catch (err) {
    console.error("Error fetching route from OSRM:", err.message);
  }
}
/* ------------- 🟢 Socket.io for real-time location updates ------------- */
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Receive real-time location updates from the ambulance driver
  socket.on("updateLocation", (data) => {
    ambulanceLocations.set(data.ambulanceId, { lat: data.lat, lng: data.lng });

    // Broadcast new location to all clients
    io.emit("ambulanceLocationUpdate", {
      ambulanceId: data.ambulanceId,
      lat: data.lat,
      lng: data.lng,
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

/* ------------- 🟢 Routes ------------- */

// 🟢 Get all ambulances
app.get("/api/ambulances", async (req, res) => {
  try {
    const ambulances = await prisma.ambulance.findMany();
    res.json(ambulances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching ambulances" });
  }
});

// 🟢 Book an ambulance
app.post("/api/book", async (req, res) => {
  // const { ambulanceId, userId } = req.body;
  const { ambulanceId, userId, userLocation } = req.body;


  try {
    // Check if ambulance exists
    const ambulance = await prisma.ambulance.findUnique({ where: { id: ambulanceId } });
    if (!ambulance) return res.status(404).json({ error: "Ambulance not found" });

    // Create booking record
    const booking = await prisma.booking.create({
      data: { ambulanceId, userId, status: "booked" },
    });

    // 🔄 Start movement from a random nearby location
    const randomStart = {
      lat: userLocation.lat - 0.01 + Math.random() * 0.02,
      lng: userLocation.lng - 0.01 + Math.random() * 0.02,
    };
    
    moveAmbulanceTowardsUser(io, ambulanceId, randomStart, userLocation);
    res.status(201).json({ message: "Ambulance booked successfully", booking });

    // Notify driver (you can extend this to notify drivers in real apps)
    // io.emit("ambulanceBooked", { ambulanceId, userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error booking ambulance" });
  }
});

// 🟢 Get ambulance location (Real-time)
app.get("/api/ambulance-location/:ambulanceId", (req, res) => {
  const { ambulanceId } = req.params;
  const location = ambulanceLocations.get(ambulanceId);
  res.json(location || { error: "Location not available" });
});


app.get('/', (req,res)=>{
    res.send('Hello from the server!');
})
app.post("/create-user", async (req, res) => {
    const { email, name } = req.body;
  
    try {
      const user = await prisma.user.create({
        data: {
          email,
          name,
        },
      });
  
      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating user" });
    }
  });
  
  // 🟢 Route to fetch all users 
  app.get("/users", async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching users" });
    }
  });

// Root
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// Create user (temporary route for testing)
app.post('/create-user', async (req, res) => {
  const { email, name } = req.body;
  try {
    const user = await prisma.user.create({ data: { email, name } });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// User signup
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// User login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

    res.json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Logout
app.post('/logout', (req, res) => {
  res.clearCookie('auth_token');
  // res.clearCookie('userId');
  res.json({ message: 'Logged out successfully' });
});

// Check login status
app.get('/isloggedin', async (req, res) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) return res.json({ isLoggedIn: false });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    res.json({ isLoggedIn: !!user, user });
  } catch (error) {
    console.error('Authentication check failed:', error);
    res.json({ isLoggedIn: false });
  }
});

// Add doctor
app.post('/doctors', async (req, res) => {
  const { name, speciality, fee, image } = req.body;
  if (!name || !speciality || !fee) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const doctor = await prisma.doctor.create({
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
});

// Get all doctors with reviews & surgeries
app.get('/doctors', async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        Review: true,   // ✅ match exactly as in your schema
        Surgery: true   // ✅ case-sensitive
      }
    });
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error.message, error.stack);
    res.status(500).json({ error: 'Error fetching doctors' });
  }
});




// Add review
app.post('/reviews', async (req, res) => {
  const { rating, text, userId, doctorId } = req.body;
  try {
    const review = await prisma.review.create({
      data: {
        rating,
        text,
        userId,
        doctorId
      }
    });
    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Error adding review' });
  }
});

// Add surgery
app.post('/surgeries', async (req, res) => {
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
});

// Add product
app.post('/products', async (req, res) => {
  const { name, image, price, description, rating, vendor } = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        name,
        image,
        price: parseFloat(price),
        description,
        rating: parseFloat(rating),
        vendor
      }
    });
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding product' });
  }
});

// Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
