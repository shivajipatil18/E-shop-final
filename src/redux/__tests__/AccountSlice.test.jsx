import accountReducer, {
  fetchUser,
  updateUserInfo,
  changePassword,
  clearAccountState,
} from '../../redux/AccountSlice';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';


jest.mock('axios');

describe('Account Slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { account: accountReducer },
    });
  });

  it('should return the initial state', () => {
    const initialState = {
      user: null,
      status: 'idle',
      error: null,
    };
    expect(accountReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle clearAccountState action', () => {
    const initialState = {
      user: { id: 1, name: 'John Doe' },
      status: 'succeeded',
      error: null,
    };
    const action = clearAccountState();
    const nextState = accountReducer(initialState, action);

    expect(nextState).toEqual({
      user: null,
      status: 'idle',
      error: null,
    });
  });

  describe('fetchUser', () => {
    it('should handle fetchUser.fulfilled', async () => {
      const userData = { id: 1, name: 'John Doe' };
      axios.get.mockResolvedValueOnce({ data: userData });

      const action = await store.dispatch(fetchUser(1));
      const state = store.getState().account;

      expect(state.user).toEqual(userData);
      expect(state.status).toBe('succeeded');
      expect(state.error).toBeNull();
    });

    it('should handle fetchUser.rejected', async () => {
      const error = 'Failed to fetch user';
      axios.get.mockRejectedValueOnce({ response: { data: error } });

      const action = await store.dispatch(fetchUser(1));
      const state = store.getState().account;

      expect(state.status).toBe('failed');
      expect(state.error).toBe(error);
    });

    it('should handle fetchUser.pending', async () => {
      const action = store.dispatch(fetchUser(1));
      const state = store.getState().account;

      expect(state.status).toBe('loading');
    });
  });

  describe('updateUserInfo', () => {
    it('should handle updateUserInfo.fulfilled', async () => {
      const updatedUserData = { id: 1, name: 'John Doe Updated' };
      axios.patch.mockResolvedValueOnce({ data: updatedUserData });

      const action = await store.dispatch(updateUserInfo({ id: 1, data: updatedUserData }));
      const state = store.getState().account;

      expect(state.user).toEqual(updatedUserData);
    });

    it('should handle updateUserInfo.rejected', async () => {
      const error = 'Password update failed';
      axios.patch.mockRejectedValue({
        response: { data: 'Password update failed' }
      });
      
      const action = await store.dispatch(updateUserInfo({ id: 1, data: {} }));
      const state = store.getState().account;

      expect(state.error).toBe(error);
    });
  });

  describe('changePassword', () => {
    it('should handle changePassword.fulfilled', async () => {
      const updatedPassword = { password: 'newPassword123' };
      axios.patch.mockResolvedValueOnce({ data: updatedPassword });

      store.dispatch(fetchUser(1)); // First, load the user
      const action = await store.dispatch(changePassword({ id: 1, currentPassword: 'oldPassword123', newPassword: 'newPassword123' }));
      const state = store.getState().account;

      expect(state.user.password).toBe(updatedPassword.password);
    });

    it('should handle changePassword.rejected with incorrect current password', async () => {
      store.dispatch(fetchUser(1)); 
      const action = await store.dispatch(changePassword({ id: 1, currentPassword: 'wrongPassword', newPassword: 'newPassword123' }));
      const state = store.getState().account;

      expect(state.error).toBe('Current password is incorrect.');
    });

    it('should handle changePassword.rejected on API error', async () => {
      const error = 'Password update failed';
      axios.patch.mockRejectedValue({
        response: {
          data: 'Password update failed'
        }
      });
      
      store.dispatch(fetchUser(1)); 
      const action = await store.dispatch(changePassword({ id: 1, currentPassword: 'oldPassword123', newPassword: 'newPassword123' }));
      const state = store.getState().account;

      expect(state.error).toBe(error);
    });
  });
});
