import cartReducer, {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setCart,
  searchProduct,
  clearCart,
} from "../redux/CartSlice";

describe("cartSlice", () => {
  const sampleProduct = {
    id: 1,
    title: "Test Product",
    price: 100,
    image: "image.jpg",
  };

  it("should return the initial state", () => {
    const initialState = cartReducer(undefined, { type: undefined });
    expect(initialState.products).toEqual(expect.any(Array));
    expect(initialState.totalQuantity).toBeDefined();
    expect(initialState.totalPrice).toBeDefined();
  });

  it("should handle addToCart for new product", () => {
    const state = cartReducer(undefined, addToCart(sampleProduct));
    expect(state.products.length).toBe(1);
    expect(state.totalQuantity).toBe(1);
    expect(state.totalPrice).toBe(100);
  });

  it("should handle addToCart for existing product", () => {
    const initialState = {
      products: [{ ...sampleProduct, quantity: 1, totalPrice: 100 }],
      totalQuantity: 1,
      totalPrice: 100,
      searchResults: [],
    };
    const state = cartReducer(initialState, addToCart(sampleProduct));
    expect(state.products[0].quantity).toBe(2);
    expect(state.products[0].totalPrice).toBe(200);
    expect(state.totalQuantity).toBe(2);
    expect(state.totalPrice).toBe(200);
  });

  it("should handle removeFromCart", () => {
    const initialState = {
      products: [{ ...sampleProduct, quantity: 2, totalPrice: 200 }],
      totalQuantity: 2,
      totalPrice: 200,
      searchResults: [],
    };
    const state = cartReducer(initialState, removeFromCart(sampleProduct.id));
    expect(state.products.length).toBe(0);
    expect(state.totalQuantity).toBe(0);
    expect(state.totalPrice).toBe(0);
  });

  it("should handle increaseQuantity", () => {
    const initialState = {
      products: [{ ...sampleProduct, quantity: 1, totalPrice: 100 }],
      totalQuantity: 1,
      totalPrice: 100,
      searchResults: [],
    };
    const state = cartReducer(initialState, increaseQuantity(sampleProduct.id));
    expect(state.products[0].quantity).toBe(2);
    expect(state.products[0].totalPrice).toBe(200);
    expect(state.totalQuantity).toBe(2);
    expect(state.totalPrice).toBe(200);
  });

  it("should handle decreaseQuantity", () => {
    const initialState = {
      products: [{ ...sampleProduct, quantity: 2, totalPrice: 200 }],
      totalQuantity: 2,
      totalPrice: 200,
      searchResults: [],
    };
    const state = cartReducer(initialState, decreaseQuantity(sampleProduct.id));
    expect(state.products[0].quantity).toBe(1);
    expect(state.products[0].totalPrice).toBe(100);
    expect(state.totalQuantity).toBe(1);
    expect(state.totalPrice).toBe(100);
  });

  it("should not decrease quantity below 1", () => {
    const initialState = {
      products: [{ ...sampleProduct, quantity: 1, totalPrice: 100 }],
      totalQuantity: 1,
      totalPrice: 100,
      searchResults: [],
    };
    const state = cartReducer(initialState, decreaseQuantity(sampleProduct.id));
    expect(state.products[0].quantity).toBe(1);
    expect(state.totalQuantity).toBe(1);
  });

  it("should handle clearCart", () => {
    const initialState = {
      products: [{ ...sampleProduct, quantity: 2, totalPrice: 200 }],
      totalQuantity: 2,
      totalPrice: 200,
      searchResults: [],
    };
    const state = cartReducer(initialState, clearCart());
    expect(state.products.length).toBe(0);
  });

  it("should handle setCart", () => {
    const customCart = {
      products: [{ ...sampleProduct, quantity: 1, totalPrice: 100 }],
      totalQuantity: 1,
      totalPrice: 100,
      searchResults: [],
    };
    const state = cartReducer(undefined, setCart(customCart));
    expect(state.products.length).toBe(1);
    expect(state.totalPrice).toBe(100);
  });

  it("should handle searchProduct", () => {
    const initialState = {
      products: [
        { id: 1, title: "iPhone", price: 1000 },
        { id: 2, title: "MacBook", price: 2000 },
      ],
      totalQuantity: 0,
      totalPrice: 0,
      searchResults: [],
    };
    const state = cartReducer(initialState, searchProduct("mac"));
    expect(state.searchResults.length).toBe(1);
    expect(state.searchResults[0].title).toBe("MacBook");
  });
});
