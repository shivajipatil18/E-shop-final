import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  products: [],
  totalQuantity: 0,
  totalPrice: 0,
  searchResults: [],
};
let storedCart ="";
if (typeof window !== "undefined") {
storedCart = window.localStorage.getItem("cart");
}
if (storedCart) {
  initialState = JSON.parse(storedCart);
}
const cartSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      const query = action.payload.toLowerCase();
      state.searchResults = state.products.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    },
  
    addToCart(state, action) {
      const newItem = action.payload;
      const itemIndex = state.products.findIndex(
        (item) => item.id === newItem.id
      );
    
      if (itemIndex !== -1) {
        state.products[itemIndex].quantity++;
        state.products[itemIndex].totalPrice += newItem.price;
      } else {
        state.products.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          image: newItem.image,
        });
      }
    
      state.totalQuantity = state.products.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.products.reduce((sum, item) => sum + item.quantity * item.price, 0)
    },
    
    removeFromCart(state, action) {
      const id = action.payload;
      const findItem = state.products.findIndex((item) => item.id === id);
      if (findItem !== -1) {
        state.totalPrice -= state.products[findItem].totalPrice;
        state.totalQuantity -= state.products[findItem].quantity;
        state.products = state.products.filter((item) => item.id !== id);
      }
    },
    increaseQuantity(state, action) {
      const id = action.payload;
      const findItem = state.products.findIndex((item) => item.id === id);
      if (findItem !== -1) {
        state.products[findItem].quantity++;
        state.products[findItem].totalPrice += state.products[findItem].price;
        state.totalQuantity++;
        state.totalPrice += state.products[findItem].price;
      }
    },
    decreaseQuantity(state, action) {
      const id = action.payload;
      const findItem = state.products.findIndex((item) => item.id === id);
      if (findItem !== -1 && state.products[findItem].quantity > 1) {
        state.products[findItem].quantity--;
        state.products[findItem].totalPrice -= state.products[findItem].price;
        state.totalQuantity--;
        state.totalPrice -= state.products[findItem].price;
      }
      
    },
    setCart: (state, action) => {
      return action.payload;
    },
    clearCart(state) {
      state.products = [];
    },
  },  
  
});
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity,setCart,searchProduct,clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
