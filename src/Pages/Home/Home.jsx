import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectFilteredProducts,
} from "../../redux/ProductSlice";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Infosection from "../Infosection/Infosection";
import ImageSlider from "../../Components/ImageSlider";
import ScrollToTop from "../../Components/ScrollToTop";
import { setupInfiniteScroll } from "../../utils/Utils";
import CategoryFilter from "../../Components/CatagoryFiltters/CatagoryFilters";
import PriceFilter from "../../Components/priceFilters/PriceFilter";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const filteredProducts = useSelector(selectFilteredProducts);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const visibleProducts = setupInfiniteScroll(filteredProducts, 6, 3);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="w-full bg-gradient-to-br from-white via-gray-100 to-white text-gray-800">
      <ImageSlider />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Infosection />

        <h1 className="text-5xl font-bold mb-12 text-center text-gray-800 drop-shadow-lg">
          ✨ Shop the Spotlight
        </h1>

        {loading && (
          <div className="text-center text-blue-500 font-medium py-4 animate-pulse">
            Fetching products...
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 font-medium py-4">
            Error: {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 bg-gradient-to-br">
          {/* Sidebar Filter */}
          <aside className="md:col-span-3 bg-white p-6 rounded-3xl shadow-xl border border-gray-200 sticky top-24 h-fit z-10">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">🎯 Filter</h2>
            <CategoryFilter />
            <PriceFilter />
          </aside>

        
          <main className="md:col-span-9 bg-white rounded-3xl  p-6 bg-gradient-to-br">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleProducts.slice(0, 9).map((product,index) => (
                  <ProductCard key={`${product.id}-${index}`} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-10 text-lg">
                😔 No products found.
              </div>
            )}

            {filteredProducts.length > 0 &&  visibleProducts.length > 0 &&
              visibleProducts.length < filteredProducts.length && (
                <div className="text-center mt-10 text-gray-400 text-sm">
                  ⏳ Loading more products...
                </div>
              )}
          </main>
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
};

export default Home;
