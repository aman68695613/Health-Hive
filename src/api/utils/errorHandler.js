/* eslint-disable no-undef */
// src/api/utils/errorHandler.js

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
    constructor(statusCode, message, errors = []) {
      super(message);
      this.statusCode = statusCode;
      this.errors = errors;
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  /**
   * Global error handler middleware
   */
  export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({
        error: err.message,
        errors: err.errors,
      });
    }
    
    // Handle Prisma errors
    if (err.name === 'PrismaClientKnownRequestError') {
      return res.status(400).json({
        error: 'Database error',
        message: err.message
      });
    }
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation error',
        errors: err.errors
      });
    }
    
    // Default server error
    return res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
    });
  };
  
  /**
   * Async handler to avoid try-catch in routes
   */
  export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };