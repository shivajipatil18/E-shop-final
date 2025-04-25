import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredProducts } from '../../redux/ProductSlice';
import { addToCart } from '../../redux/CartSlice';
import { toast } from 'react-toastify';

const TrendingNow = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);

  const trendingProducts = (products || [])
    .filter((product) => product.rating?.rate > 4)
    .slice(0, 8);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.title} has been added to your cart!`);

  };

  if (trendingProducts.length === 0) {
    return (
      <p className="text-center text-lg text-gray-500">
        No trending products available.
      </p>
    );
  }

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          🔥 Trending Now
        </h2>
        <p className="text-lg text-center text-gray-600 mb-12">
          Check out the hottest products currently trending in our store!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 overflow-hidden flex flex-col"
            >
              <img
                src={product.image || '/default-image.jpg'}
                alt={product.title || 'Product Image'}
                className="w-full h-60 object-contain bg-gray-100 p-4"
              />
              <div className="p-5 flex flex-col justify-between flex-grow">
                <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
                  {product.title || 'Untitled'}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {product.description || ''}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-red-600">
                    ₹{product.price !== undefined ? product.price : 'N/A'}
                  </span>
                  <button
                  data-testid="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                    className="bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-red-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  ⭐ {product.rating?.rate || 'N/A'} / 5
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingNow;
