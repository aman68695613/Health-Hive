// src/api/socket/socketManager.js
import { Server } from "socket.io";
import { CLIENT_URL } from "../config/constants.js";
import { updateAmbulanceLocation } from "../controllers/ambulanceController.js";

let io;
const users = new Map(); // Stores connected users: socketId -> { userId, role }

export const setupSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: CLIENT_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    
    // Register user
    socket.on("register", ({ userId, role }) => {
      users.set(socket.id, { userId, role });
      socket.join(`user-${userId}`); // Join user-specific room
      console.log(`User ${userId} registered as ${role}`);
    });

    // Chat messages
    socket.on("sendMessage", ({ senderId, receiverId, message }) => {
      const timestamp = new Date().toISOString();
      io.to(`user-${receiverId}`).emit("receiveMessage", {
        senderId,
        message,
        timestamp,
      });
    });

    // Ambulance location updates
    socket.on("updateLocation", (data) => {
      updateAmbulanceLocation(data.ambulanceId, data.lat, data.lng);

      // Broadcast new location to all clients
      io.emit("ambulanceLocationUpdate", {
        ambulanceId: data.ambulanceId,
        lat: data.lat,
        lng: data.lng,
      });
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
      users.delete(socket.id);
    });
  });

  return io;
};

export const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

export const getUsers = () => {
  return users;
};