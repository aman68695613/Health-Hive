/* eslint-disable no-undef */
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));
app.use(cookieParser());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const PORT = process.env.PORT || 3000;

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

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('auth_token', token, { httpOnly: true });

    res.json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Logout
app.post('/logout', (req, res) => {
  res.clearCookie('auth_token');
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
        reviews: true,
        surgeries: true
      }
    });
    res.json(doctors);
  } catch (error) {
    console.error(error);
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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});