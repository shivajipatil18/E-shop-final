import React from "react";
import { FaStar } from "react-icons/fa";
import { addToCart } from "../../redux/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRupeeSign } from "react-icons/fa";

const ProductCard = ({ product,...props }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.products);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    const isItemInCart = cartItems.some((item) => item.id === product.id);
    dispatch(addToCart(product));

    if (isItemInCart) {
      toast.info("Same item is added again");
    } else {
      toast.success("Product added to cart");
    }
  };

  return (
    <Link to={`product/${product.id}`}>
      <div data-testid="product-card" className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col max-w-xs border border-gray-100 dark:border-gray-700">
      
        <div className="relative h-44 bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="flex flex-col flex-grow mt-2 justify-between">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white line-clamp-2 leading-snug mb-1">
            {product.title}
          </h3>
          <div className="mt-2 text-xl font-bold text-red-600 flex items-center">
            <FaRupeeSign className="mr-1 text-base" />
            {product.price}
          </div>

       
          <div className="flex items-center mt-2">
            <div className="flex text-yellow-500 text-sm">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  data-testid="star-icon"

                  className={
                    index < Math.round(product.rating?.rate || 4)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
              ({product.rating?.count || 100})
            </span>
          </div>

       
          <button
            className="mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2 rounded-xl transition duration-300"
            onClick={(e) => handleAddToCart(e, product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

 export default ProductCard;
