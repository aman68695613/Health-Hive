// src/api/controllers/productController.js
import { Product } from '../models/index.js';

export const addProduct = async (req, res) => {
  const { name, image, price, description, rating, vendor } = req.body;
  
  try {
    const product = await Product.create({
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
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findMany();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching products' });
  }
};