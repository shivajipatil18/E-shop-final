import reducer, { login, register, logout } from '../authSlice';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

const initialState = {
  isAuthenticated: false,
  status: 'idle',
  error: null,
  user: null,
};

const createTestStore = (preloadedState = initialState) =>
  configureStore({
    reducer: {
      auth: reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    preloadedState: { auth: preloadedState },
  });

describe('authSlice', () => {
  afterEach(() => mock.reset());

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle logout', () => {
    const state = reducer({ ...initialState, isAuthenticated: true, user: { name: 'John' } }, logout());
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBe(null);
  });

  it('should handle register.fulfilled', async () => {
    const store = createTestStore();
    const userData = { name: 'John', email: 'john@example.com', password: '123456' };
    mock.onPost('http://localhost:3001/users').reply(200, userData);

    await store.dispatch(register(userData));
    const state = store.getState().auth;
    expect(state.status).toBe('succeeded');
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(userData);
  });

  it('should handle register.rejected', async () => {
    const store = createTestStore();
    mock.onPost('http://localhost:3001/users').reply(500, 'Registration failed');

    await store.dispatch(register({ name: '', email: '', password: '' }));
    const state = store.getState().auth;
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Registration failed');
  });

  it('should handle login.fulfilled with valid user', async () => {
    const userData = [{ name: 'John', email: 'john@example.com', password: '123456' }];
    mock
      .onGet('http://localhost:3001/users?email=john@example.com&password=123456')
      .reply(200, userData);

    const store = createTestStore();
    await store.dispatch(login({ email: 'john@example.com', password: '123456' }));

    const state = store.getState().auth;
    expect(state.status).toBe('succeeded');
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(userData);
  });

  it('should handle login.fulfilled with empty user list', async () => {
    mock
      .onGet('http://localhost:3001/users?email=empty@example.com&password=123456')
      .reply(200, []);

    const store = createTestStore();
    await store.dispatch(login({ email: 'empty@example.com', password: '123456' }));

    const state = store.getState().auth;
    expect(state.user).toEqual([]);
  });

  it('should handle login.rejected', async () => {
    const store = createTestStore();
    mock
      .onGet('http://localhost:3001/users?email=error@example.com&password=123456')
      .reply(500, 'Login failed');

    await store.dispatch(login({ email: 'error@example.com', password: '123456' }));
    const state = store.getState().auth;
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Login failed');
  });
});
