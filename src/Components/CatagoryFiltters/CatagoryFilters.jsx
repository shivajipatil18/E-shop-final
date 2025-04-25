import React, { useEffect, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setFilteredProducts } from "../../redux/ProductSlice";

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();

  const category = useSelector((state) => state.product.category);
  const allProducts = useSelector((state) => state.product.products);
  const price = useSelector((state) => state.product.price);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;

    startTransition(() => {
      dispatch(setCategory(selectedCategory));

      const filtered = allProducts.filter((product) => {
        const matchCategory = selectedCategory
          ? product.category.toLowerCase() === selectedCategory.toLowerCase()
          : true;
        const matchPrice =
          price?.min !== undefined && price?.max !== undefined
            ? product.price >= price.min && product.price <= price.max
            : true;

        return matchCategory && matchPrice;
      });

      dispatch(setFilteredProducts(filtered));
    });
  };

  useEffect(() => {
    startTransition(() => {
      const filtered = allProducts.filter((product) => {
        const matchCategory = category
          ? product.category.toLowerCase() === category.toLowerCase()
          : true;
        const matchPrice =
          price?.min !== undefined && price?.max !== undefined
            ? product.price >= price.min && product.price <= price.max
            : true;

        return matchCategory && matchPrice;
      });

      dispatch(setFilteredProducts(filtered));
    });
  }, [category, price, allProducts, dispatch]);

  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-600">
        Category
      </label>
      <select
        className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
        value={category}
        onChange={handleCategoryChange}
      >
        <option value="">All</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
      </select>

      {isPending && (
        <p className="text-sm text-blue-500 mt-2">Filtering products...</p>
      )}
    </div>
  );
};

export default CategoryFilter;
