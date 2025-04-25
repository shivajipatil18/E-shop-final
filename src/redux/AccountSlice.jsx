import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchUser = createAsyncThunk('account/fetchUser', async (id, { rejectWithValue }) => {
  try {
    const res = await axios.get(`http://localhost:3001/users/${id}`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || 'Failed to fetch user');
  }
});

export const updateUserInfo = createAsyncThunk(
  'account/updateUserInfo',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`http://localhost:3001/users/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to update info');
    }
  }
);

// Change password
export const changePassword = createAsyncThunk(
  'account/changePassword',
  async ({ id, currentPassword, newPassword }, { rejectWithValue, getState }) => {
    try {
      const { account } = getState();
      if (account.user.password !== currentPassword) {
        return rejectWithValue('Current password is incorrect.');
      }
      const res = await axios.patch(`http://localhost:3001/users/${id}`, { password: newPassword });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Password update failed');
    }
  }
);

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearAccountState: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      }).addCase(updateUserInfo.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.user = { ...state.user, password: action.payload.password };
      }).addCase(changePassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });;
  },
});

export const { clearAccountState } = accountSlice.actions;
export default accountSlice.reducer;
