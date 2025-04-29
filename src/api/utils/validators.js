// src/api/utils/validators.js

/**
 * Validates user registration data
 * @param {Object} data - User data to validate
 * @returns {Object} - Validation result with errors if any
 */
export const validateUserRegistration = (data) => {
    const errors = {};
    
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Invalid email format';
    }
    
    if (!data.name) {
      errors.name = 'Name is required';
    }
    
    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  
  /**
   * Validates email format
   * @param {string} email - Email to validate
   * @returns {boolean} - Whether the email is valid
   */
  export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Validates doctor data
   * @param {Object} data - Doctor data to validate
   * @returns {Object} - Validation result with errors if any
   */
  export const validateDoctorData = (data) => {
    const errors = {};
    
    if (!data.name) {
      errors.name = 'Doctor name is required';
    }
    
    if (!data.speciality) {
      errors.speciality = 'Speciality is required';
    }
    
    if (!data.fee) {
      errors.fee = 'Fee is required';
    } else if (isNaN(parseFloat(data.fee))) {
      errors.fee = 'Fee must be a valid number';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  
  /**
   * Validates product data
   * @param {Object} data - Product data to validate
   * @returns {Object} - Validation result with errors if any
   */
  export const validateProductData = (data) => {
    const errors = {};
    
    if (!data.name) {
      errors.name = 'Product name is required';
    }
    
    if (!data.price) {
      errors.price = 'Price is required';
    } else if (isNaN(parseFloat(data.price))) {
      errors.price = 'Price must be a valid number';
    }
    
    if (data.rating && isNaN(parseFloat(data.rating))) {
      errors.rating = 'Rating must be a valid number';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };