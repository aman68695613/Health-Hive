import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 py-12 px-6 font-[Outfit,Manrope,sans-serif]">
    <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 tracking-tight mb-10">
        Products
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map((product) => (
            <div key={product.id} className="relative p-6 rounded-2xl shadow-xl border border-gray-700 transition-transform transform hover:scale-105 hover:shadow-2xl overflow-hidden group duration-500 ">

                {/* Animated Background Layer */}

                <div className="absolute inset-0 bg-gradient-to-tr from-pink-600 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 gradient-hover-effect "></div>
                {/* Card Content */}
                <div className=" relative bg-gradient-to-b from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 z-10">
                    <img src={product.image} alt={product.name}
                        className="w-full h-48 object-cover rounded-lg shadow-md border border-gray-700" />

                    <div className="mt-4">
                        <h3 className="text-2xl font-semibold text-white tracking-wide">{product.name}</h3>
                        <p className="text-gray-400 text-sm mt-2 leading-relaxed line-clamp-2">{product.description}</p>

                        <div className="flex justify-between items-center mt-4">
                            <p className="text-green-400 font-medium text-lg">&#8377;{product.price}</p>
                            <p className="text-yellow-400 font-semibold flex items-center">
                                ⭐ <span className="ml-1">{product.rating}</span>
                            </p>
                        </div>

                        <p className="text-indigo-400 text-sm mt-1 italic font-medium">Vendor: {product.vendor}</p>

                        <button className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-pink-600 to-purple-500 text-white text-lg font-semibold shadow-md hover:from-purple-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>



  );
};
export default ProductsPage;