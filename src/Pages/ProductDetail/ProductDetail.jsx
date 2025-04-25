import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../../redux/CartSlice";
import { toast } from "react-toastify";
import ProductSkeleton from "../../Components/ProductSkeleton";

const sizes = ["S", "M", "L", "XL"];

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);

  const { id } = useParams();
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.product);

  useEffect(() => {
    const newProduct = products.find((p) => p.id === parseInt(id));

    setProduct(newProduct);
  }, [id, products]);

  const isSizeRequired =
    product?.category &&
    (product.category.toLowerCase().includes("clothing") ||
      product.category.toLowerCase().includes("shoe"));

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (isSizeRequired && !selectedSize) {
      setSizeError(true);
      return;
    }

    setSizeError(false);
    dispatch(addToCart({ ...product, selectedSize }));
    toast.success("Product added to the cart!");
    navigate("/cart");
  };

  if (loading || !product) {
    return <ProductSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 bg-white shadow-md rounded-xl p-6">
   
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative group">
            <img
              src={product.image}
              alt={product.title}
              className="w-80 h-80 object-contain rounded-xl border hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute top-0 left-0 w-full h-full hidden group-hover:flex items-center justify-center text-white bg-black bg-opacity-40 rounded-xl">
              <p className="text-sm">Zoomed In</p>
            </div>
          </div>
        </div>

      
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {product.title}
            </h2>
            <p className="text-gray-600 mb-3">{product.description}</p>
            <p className="text-red-600 text-xl font-bold mb-2">
              ₹ {product.price}
            </p>
            <p className="text-sm text-gray-500">
              Rating: {product.rating?.rate} ⭐
            </p>

            {/* Size Selection */}
            {isSizeRequired && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-1">Select Size</h4>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-1 border rounded-full text-sm transition-all duration-200 ease-in-out ${
                        selectedSize === size
                          ? "bg-red-600 text-white border-red-600 scale-105 shadow-md"
                          : "hover:bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {sizeError && (
                  <p className="text-sm text-red-500 mt-2">
                    * Please select a size before adding to cart
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            className={`mt-6 font-semibold py-2 px-6 rounded-xl transition-all ${
              isSizeRequired && !selectedSize
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
            onClick={handleAddToCart}
            disabled={isSizeRequired && !selectedSize}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
