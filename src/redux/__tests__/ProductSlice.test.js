import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import reducer, {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  setCategory,
  setPrice,
  setSearchTerm,
  setFilteredData,
  setFilteredProducts
} from '../ProductSlice';

const mock = new MockAdapter(axios);

const initialState = {
  products: [],
  searchTerm: '',
  filteredData: [],
  filteredProducts: [],
  loading: false,
  error: null,
  category: '',
  price: 1000
};

const createTestStore = () =>
  configureStore({
    reducer: {
      product: reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
    preloadedState: {
      product: initialState,
    },
  });

describe('productSlice', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle setCategory', () => {
    const state = reducer(initialState, setCategory('electronics'));
    expect(state.category).toBe('electronics');
  });

  it('should handle setPrice', () => {
    const state = reducer(initialState, setPrice(500));
    expect(state.price).toBe(500);
  });

  it('should handle setSearchTerm', () => {
    const state = reducer(initialState, setSearchTerm('shirt'));
    expect(state.searchTerm).toBe('shirt');
  });

  it('should handle setFilteredData', () => {
    const data = [{ id: 1, title: 'test' }];
    const state = reducer(initialState, setFilteredData(data));
    expect(state.filteredData).toEqual(data);
  });

  it('should handle setFilteredProducts', () => {
    const data = [{ id: 1, title: 'test' }];
    const state = reducer(initialState, setFilteredProducts(data));
    expect(state.filteredProducts).toEqual(data);
  });

  it('should handle fetchProducts fulfilled', async () => {
    const store = createTestStore();
    const mockProducts = [{ id: 1, title: 'Product 1' }];
    mock.onGet('https://fakestoreapi.com/products').reply(200, mockProducts);

    await store.dispatch(fetchProducts());

    const state = store.getState().product;
    expect(state.products).toEqual(mockProducts);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should handle fetchProducts error', async () => {
    const store = createTestStore();
    mock.onGet('https://fakestoreapi.com/products').networkError();

    await store.dispatch(fetchProducts());

    const state = store.getState().product;
    expect(state.error).toBeDefined();
    expect(state.loading).toBe(false);
  });

  it('should handle addProduct', async () => {
    const store = createTestStore();
    const newProduct = { title: 'New Product' };
    mock.onPost('https://fakestoreapi.com/products').reply(200, { id: 1, ...newProduct });

    await store.dispatch(addProduct(newProduct));
    const state = store.getState().product;

    expect(state.products).toContainEqual(expect.objectContaining({
      id: 1,
      title: 'New Product',
      rating: { rate: 0, count: 0 },
    }));
  });

  it('should handle updateProduct', async () => {
    const store = createTestStore({
      products: [
        { id: 1, title: 'Old Product', rating: { rate: 0, count: 0 } },
      ],
    });
  
    const updatedProduct = { id: 1, title: 'Updated Product' };
    mock
      .onPut('https://fakestoreapi.com/products/1')
      .reply(200, updatedProduct);
  
    await store.dispatch(updateProduct(updatedProduct));
    const state = store.getState().product;
  
    expect(state.products).toContainEqual(updatedProduct);
  });
  
  

  it('should handle deleteProduct', async () => {
    const store = createTestStore({
      products: [
        { id: 1, title: 'Product 1', rating: { rate: 0, count: 0 } },
      ],
    });
  
    mock.onDelete('https://fakestoreapi.com/products/1').reply(200);
  
    await store.dispatch(deleteProduct(1));
    const state = store.getState().product;
  
    expect(state.products.find(p => p.id === 1)).toBeUndefined();
  });
  
});
