// src/api/controllers/userController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { JWT_SECRET } from '../config/constants.js';

export const createUser = async (req, res) => {
  const { email, name } = req.body;

  try {
    const user = await User.create({
      data: { email, name }
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching users' });
  }
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const existingUser = await User.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      data: { 
        name, 
        email, 
        password: hashedPassword 
      }
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
    
    // Set cookie
    res.cookie('auth_token', token,{
  httpOnly: true,
  secure: true,       // ⛳ Required for cookies to work over HTTPS
  sameSite: 'None',   // ⛳ Required for cross-site cookies

  
});
    
    res.json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in' });
  }
};

export const logout = (req, res) => {
  res.clearCookie('auth_token');
  res.json({ message: 'Logged out successfully' });
};

export const checkLoginStatus = async (req, res) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) {
      return res.json({ isLoggedIn: false });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findUnique({ where: { id: decoded.userId } });

    res.json({ isLoggedIn: !!user, user });
  } catch (error) {
    console.error('Authentication check failed:', error);
    res.json({ isLoggedIn: false });
  }
};