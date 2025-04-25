import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
});

// Add a new product
export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
  const response = await axios.post('https://fakestoreapi.com/products', product);
  return {
    ...response.data,
    rating: { rate: 0, count: 0 }, 
  };
});


export const updateProduct = createAsyncThunk('products/updateProduct', async (product) => {
  const response = await axios.put(`https://fakestoreapi.com/products/${product.id}`, product);
  return response.data;
});


export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  await axios.delete(`https://fakestoreapi.com/products/${id}`);
  return id;
});


export const selectFilteredProducts = (state) => {
  const { products = [], category, price } = state.product || {};
  return products.filter((product) => {
    const matchCategory = category ? product.category === category : true;
    const matchPrice = product.price <= price;
    // const matchRating = typeof product.rating === 'number' ? product.rating >= minRating : false;

    return matchCategory && matchPrice //&& matchRating;
    
  });
};

const initialState = {
  products: [],
  searchTerm: "",
  filteredData: [],
  loading: false,
  error: null,
  category: "",
  price: 1000,
  // minRating: 4, 

};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
    setFilteredProducts(state, action) {
      state.filteredProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = [...state.products, ...action.payload];
        state.filteredData = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  
  },
});

export const { setCategory, setPrice, setSearchTerm, setFilteredData,setFilteredProducts } = productSlice.actions;
export default productSlice.reducer;