import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPrice } from "../../redux/ProductSlice";

const PriceFilter = () => {
  const dispatch = useDispatch();
  const price = useSelector((state) => state.product.price);

  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-600">
        Price (up to ₹{price})
      </label>
      <input
        type="range"
        min="0"
        max="1000"
        value={price}
        onChange={(e) => dispatch(setPrice(Number(e.target.value)))}
        className="w-full accent-red-500"
      />
      <p className="text-xs text-gray-500 mt-1">Use the slider to adjust</p>
    </div>
  );
};

export default PriceFilter;
