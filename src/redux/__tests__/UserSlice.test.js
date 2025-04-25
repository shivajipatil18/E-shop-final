import reducer, { fetchAllUsers } from '../UserSlice'; // Adjust path if needed
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const createTestStore = (preloadedState = initialState) =>
  configureStore({
    reducer: {
      user: reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
    preloadedState: preloadedState ? { user: preloadedState } : undefined,
  });

describe('userSlice', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle fetchAllUsers.pending', () => {
    const action = { type: fetchAllUsers.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      users: [],
      loading: true,
      error: null,
    });
  });

  it('should handle fetchAllUsers.fulfilled', () => {
    const mockUsers = [{ id: 1, name: 'John' }];
    const action = {
      type: fetchAllUsers.fulfilled.type,
      payload: mockUsers,
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      users: mockUsers,
      loading: false,
      error: null,
    });
  });

  it('should handle fetchAllUsers.rejected', () => {
    const action = {
      type: fetchAllUsers.rejected.type,
      payload: 'Network Error',
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      users: [],
      loading: false,
      error: 'Network Error',
    });
  });

  it('should handle async fetchAllUsers success', async () => {
    const mockUsers = [{ id: 1, name: 'Alice' }];
    mock.onGet('http://localhost:5000/users').reply(200, mockUsers);

    const store = createTestStore();
    await store.dispatch(fetchAllUsers());

    const state = store.getState().user;
    expect(state.users).toEqual(mockUsers);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should handle async fetchAllUsers failure', async () => {
    mock.onGet('http://localhost:5000/users').reply(500);

    const store = createTestStore();
    await store.dispatch(fetchAllUsers());

    const state = store.getState().user;
    expect(state.users).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeDefined();
  });
});
