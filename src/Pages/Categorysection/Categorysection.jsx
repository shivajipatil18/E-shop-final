import React from 'react';
import { useSelector } from 'react-redux';

const Categorysection = () => {
  const products = useSelector((state) => state.product.products);

  return (
    <div className="py-10 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Categories</h1>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {products.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer transform transition duration-300 hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-64 object-cover brightness-75 group-hover:brightness-50"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
              <p className="text-2xl font-bold capitalize">{item.category}</p>
              <p className="text-sm mt-2">Explore the latest collection</p>
              <button className="mt-4 bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-full text-sm font-medium">
                View All
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorysection;
