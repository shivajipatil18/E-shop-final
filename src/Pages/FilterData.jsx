import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../Components/ProductCard/ProductCard';

const FilterData = () => {
  const filteredProducts = useSelector((state) => state.product.filteredData) || [];

  return (
    <div>
      <div className="container mx-auto py-12 md:px-16 lg:px-24">
        {filteredProducts.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Shop</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            <h2 className="text-2xl font-bold mb-6">No Products Found</h2>
            <p>Try adjusting your filters or search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterData;