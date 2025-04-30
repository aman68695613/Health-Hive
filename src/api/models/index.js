// src/api/models/index.js
// This file exports all models for cleaner imports
import prisma from '../config/db.js';

export const User = prisma.user;
export const Doctor = prisma.doctor;
export const Review = prisma.review;
export const Surgery = prisma.surgery;
export const Product = prisma.product;
export const Hospital = prisma.hospital;
export const Queue = prisma.queue;
export const QueueEntry = prisma.queueEntry;
export const Ambulance = prisma.ambulance;
export const Booking = prisma.booking;

export default prisma;