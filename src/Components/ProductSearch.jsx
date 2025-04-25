import React, { useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../redux/ProductSlice";
import { useNavigate, Link } from "react-router-dom";

const ProductSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, searchTerm, filteredData = [] } = useSelector((state) => state.product);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (event) => {
    const value = event.target.value;
    dispatch(setSearchTerm(value));
    navigate("/search-results");

    startTransition(() => {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
      dispatch({ type: "product/setFilteredData", payload: filtered });
    });
  };

  const handleProductClick = () => {
    dispatch(setSearchTerm(""));
    dispatch({ type: "product/setFilteredData", payload: [] }); 
  };

  return (
    <div className="relative">
      <form>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search products..."
          className="w-full border py-2 px-4"
        />
      </form>

      {isPending && <p>Loading...</p>}


      {searchTerm && filteredData.length > 0 && (
        <div className="absolute bg-white border rounded mt-2 w-full z-10 shadow-md max-h-60 overflow-y-auto">
          {filteredData.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="block p-2 hover:bg-gray-100"
              onClick={handleProductClick}
            >
              {product.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
