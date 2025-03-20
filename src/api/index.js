/* eslint-disable no-undef */
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Load .env variables
import 'dotenv/config';
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import authenticateUser from './authmiddleware.js';
const app = express();
app.use(cors({
  credentials: true,
  origin:"http://localhost:5173"
}))
app.use(cookieParser());
app.use(express.json());

// eslint-disable-next-line no-undef
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const PORT=process.env.PORT||3000;
const prisma = new PrismaClient()
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
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});