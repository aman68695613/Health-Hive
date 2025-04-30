/* eslint-disable no-undef */
// src/api/config/constants.js
import 'dotenv/config';

export const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
export const PORT = process.env.PORT || 3000;