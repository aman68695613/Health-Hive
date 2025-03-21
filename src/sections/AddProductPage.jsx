import { useState } from 'react';
import axios from 'axios';

const AddProductPage = () => {
  const [product, setProduct] = useState({
    name: '',
    image: '',
    price: '',
    description: '',
    rating: '',
    vendor: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/products', product);
      alert('Product added successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4 py-10">
  <div className="max-w-lg w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl rounded-2xl p-8 border border-gray-700 backdrop-blur-lg">
    <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 tracking-tight">
      Add Product
    </h2>

    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <div>
        <label className="block text-gray-400 font-medium">Product Name</label>
        <input type="text" name="name" placeholder="Enter product name" 
          onChange={handleChange} required 
          className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" />
      </div>

      <div>
        <label className="block text-gray-400 font-medium">Image URL</label>
        <input type="text" name="image" placeholder="Paste image URL" 
          onChange={handleChange} required 
          className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
      </div>

      <div>
        <label className="block text-gray-400 font-medium">Price ($)</label>
        <input type="number" name="price" placeholder="Enter price" 
          onChange={handleChange} required 
          className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition" />
      </div>

      <div>
        <label className="block text-gray-400 font-medium">Description</label>
        <textarea name="description" placeholder="Enter product description" 
          onChange={handleChange} required 
          className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"></textarea>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-400 font-medium">Rating</label>
          <input type="number" name="rating" placeholder="0 - 5" step="0.1" 
            onChange={handleChange} required 
            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition" />
        </div>

        <div>
          <label className="block text-gray-400 font-medium">Vendor</label>
          <input type="text" name="vendor" placeholder="Vendor Name" 
            onChange={handleChange} required 
            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
        </div>
      </div>

      <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:from-blue-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
        Add Product
      </button>
    </form>
  </div>
</div>

  );
};
export default AddProductPage;