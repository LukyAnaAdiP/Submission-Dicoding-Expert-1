import { createSlice } from '@reduxjs/toolkit';

import {
  asyncGetOwnProfile,
  asyncLogin,
  asyncRegister,
} from './actions';

import { getToken } from '../../utils/storage';

const initialState = {
  token: getToken(),
  user: null,
  isLoading: false,
  isRegistering: false,
  isGettingProfile: false,
  error: null,
  registerError: null,
  profileError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Register
      .addCase(asyncRegister.pending, (state) => {
        state.isRegistering = true;
        state.registerError = null;
      })
      .addCase(asyncRegister.fulfilled, (state) => {
        state.isRegistering = false;
      })
      .addCase(asyncRegister.rejected, (state, action) => {
        state.isRegistering = false;
        state.registerError = action.error.message;
      })

      // Login
      .addCase(asyncLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(asyncLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(asyncLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Own profile
      .addCase(asyncGetOwnProfile.pending, (state) => {
        state.isGettingProfile = true;
        state.profileError = null;
      })
      .addCase(asyncGetOwnProfile.fulfilled, (state, action) => {
        state.isGettingProfile = false;
        state.user = action.payload;
      })
      .addCase(asyncGetOwnProfile.rejected, (state, action) => {
        state.isGettingProfile = false;
        state.profileError = action.error.message;
      });
  },
});

export const { logout, setToken } = authSlice.actions;

export default authSlice.reducer;