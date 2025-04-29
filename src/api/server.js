// src/api/server.js
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import http from 'http';
import { setupSocket } from './socket/socketManager.js';
import routes from './routes/index.js';

const app = express();

// Middleware
app.use(cors({
  credentials: true,
  origin: "http://localhost:5173"
}));
app.use(cookieParser());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.io
setupSocket(server);

// Routes
app.use('/api', routes);

// Root
app.get('/', (req, res) => {
  res.send('Welcome to Health Hive API!');
});

// Start server
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default server;