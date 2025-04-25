import React, { useState,useMemo } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { setupInfiniteScroll } from "../../utils/Utils";
import { selectFilteredProducts } from "../../redux/ProductSlice";
import CategoryFilter from "../../Components/CatagoryFiltters/CatagoryFilters";


const Shop = () => {
  const filteredProducts = useSelector(selectFilteredProducts);
  const categories = useSelector((state) => state.categories);  
  const [sortOrder, setSortOrder] = useState("");
  const [category, setCategory] = useState("");

  const filteredByCategory = useMemo(() => {
    return category ? filteredProducts.filter((product) => product.category === category): filteredProducts;
  }, [category, filteredProducts]);

  const sortedProducts = useMemo(() => {
    return [...filteredByCategory].sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.price - b.price;
      if (sortOrder === "highToLow") return b.price - a.price;
      return 0;
    });
  }, [filteredByCategory, sortOrder]);


  
  const visibleProducts = setupInfiniteScroll(sortedProducts, 6, 3);

  return (
    <div data-testid="shop-container" className="container mx-auto py-12 md:px-16 lg:px-24" >
      <h2  data-testid="shop-heading" className="text-3xl font-bold mb-6 text-center text-gray-800" >Shop</h2>

      
      <div className="flex flex-wrap justify-between items-center mb-6">
      
        <div className="mb-4 md:mb-0">
         <CategoryFilter />
        </div>

      
        <div className="mb-4 md:mb-0">
          <select
            className="border p-2 rounded text-sm w-full md:w-52 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
             data-testid="sort-dropdown"
          >
            <option value="">Sort by</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-4">
        {visibleProducts?.map((product,index) => (
          <ProductCard product={product} 
          key={`${product.id}-${index}`} 
          data-testid="product-card"

          
          />
        ))}

      
        {visibleProducts.length < sortedProducts.length && (
          <div data-testid="loading-more" className="text-center mt-6 text-gray-500 text-sm col-span-full">
            Loading more products...
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
