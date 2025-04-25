import reducer, {
  saveOrder,
  fetchOrders,
  fetchAllOrders,
  updateOrderStatus,
  setOrderDetails,
  clearOrderDetails,
} from '../redux/OrderSlice';

import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

const initialState = {
  orderDetails: [],
  loading: false,
  error: null,
  allOrders: [],
};

const createTestStore = () =>
  configureStore({
    reducer: {
      order: reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
    preloadedState: {
      order: initialState,
    },
  });

describe('Order Slice', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle setOrderDetails', () => {
    const action = setOrderDetails({ id: 1 });
    const state = reducer(initialState, action);
    expect(state.orderDetails).toEqual([{ id: 1 }]);
  });

  it('should handle clearOrderDetails', () => {
    const state = reducer({ ...initialState, orderDetails: [{ id: 1 }] }, clearOrderDetails());
    expect(state.orderDetails).toEqual([]);
  });

  // Save Order Tests
  it('should handle saveOrder.pending', () => {
    const state = reducer(initialState, { type: saveOrder.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle saveOrder.fulfilled', async () => {
    const mockOrder = { id: 1 };
    mock.onPost('http://localhost:5000/orders').reply(200, mockOrder);
    const store = createTestStore();

    await store.dispatch(saveOrder(mockOrder));

    const state = store.getState().order;
    expect(state.orderDetails).toEqual([mockOrder]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should handle saveOrder.rejected', async () => {
    mock.onPost('http://localhost:5000/orders').reply(500, 'Error');
    const store = createTestStore();

    await store.dispatch(saveOrder({}));

    const state = store.getState().order;
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Request failed with status code 500');
  });

  // Fetch Orders
  it('should handle fetchOrders.fulfilled', async () => {
    const response = [{ id: 1, username: 'user1' }];
    mock.onGet('http://localhost:5000/orders?username=user1').reply(200, response);
    const store = createTestStore();

    await store.dispatch(fetchOrders('user1'));
    const state = store.getState().order;

    expect(state.orderDetails).toEqual(response);
    expect(state.loading).toBe(false);
  });

  it('should handle fetchOrders.rejected', async () => {
    mock.onGet('http://localhost:5000/orders?username=user1').reply(500);
    const store = createTestStore();

    await store.dispatch(fetchOrders('user1'));
    const state = store.getState().order;

    expect(state.error).toBe('Request failed with status code 500');
    expect(state.loading).toBe(false);
  });

  // Fetch All Orders
  it('should handle fetchAllOrders.fulfilled', async () => {
    const response = [{ id: 1 }];
    mock.onGet('http://localhost:5000/orders').reply(200, response);
    const store = createTestStore();

    await store.dispatch(fetchAllOrders());
    const state = store.getState().order;

    expect(state.allOrders).toEqual(response);
  });

});

