/* eslint-disable no-undef */
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Load .env variables
import 'dotenv/config';
import { PrismaClient } from '@prisma/client'
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

  // 🟢 User Signup
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
          return res.status(400).json({ error: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user in the database
      const user = await prisma.user.create({
          data: {
              name,
              email,
              password: hashedPassword,
          },
      });

      res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating user' });
  }
});
// 🟢 User Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      // Check if user exists
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
          return res.status(400).json({ error: 'User not found' });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

      // Set token as HTTP-only cookie
      res.cookie('auth_token', token);

      res.json({ message: 'Login successful', user, token });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error logging in' });
  }
});

// 🟢 Logout Route
app.post('/logout', (req, res) => {
  res.clearCookie('auth_token');
  // res.clearCookie('userId');
  res.json({ message: 'Logged out successfully' });
});

// 🟢 Check if User is Logged In
app.get('/isloggedin', async (req, res) => {
  try {
    const token = req.cookies.auth_token; // Get token from cookies

    if (!token) {
      return res.json({ isLoggedIn: false }); // No token, user is not logged in
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if the user exists in the database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (user) {
      res.json({ isLoggedIn: true, user }); // User is logged in
    } else {
      res.json({ isLoggedIn: false }); // User not found
    }
  } catch (error) {
    console.error('Authentication check failed:', error);
    res.json({ isLoggedIn: false }); // Any error means the user is not logged in
  }
});

// 🟢 Create a new doctor
app.post('/doctors', async (req, res) => {
  const { name, speciality, fee, image } = req.body;
  try {
    const doctor = await prisma.doctor.create({
      data: { name, speciality, fee: parseFloat(fee), image }
    });
    res.status(201).json({ message: "Doctor added successfully", doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding doctor" });
  }
});

// 🟢 Get all doctors
app.get('/doctors', async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany();
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching doctors" });
  }
});

app.post('/products', async (req, res) => {
  const { name, image, price, description, rating, vendor } = req.body;
  try {
    const product = await prisma.product.create({
      data: { name, image, price: parseFloat(price), description, rating: parseFloat(rating), vendor }
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
