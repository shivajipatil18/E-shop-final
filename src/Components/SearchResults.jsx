import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from "../Components/ProductCard/ProductCard";

const SearchResults = () => {
  const { filteredData } = useSelector((state) => state.product);
const  product=useSelector((state)=>state.product)
console.log(product)


  return (
    <div className="container mx-auto p-4">
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {filteredData.map((product) => (
            <div key={product.id} > 
              <ProductCard key={product.id} product={product} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found</p>
      )}
    </div>
  );
};

export default SearchResults;