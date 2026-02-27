/**
 * AUTH SLICE (CLIENT STATE ONLY)
 *
 * Responsibilities:
 * - Hold authentication state
 * - Store access token
 * - Track auth status
 * - Handle logout reset
 *
 * ❌ No API calls here
 * ❌ No side effects
 * ❌ No axios imports
 *
 * Networking logic belongs to:
 * src/core/api
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Authentication state shape
 */
export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    role?: string;
  } | null;
}

/**
 * Initial state
 */
const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Set authentication after successful login
     */
    setCredentials: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken?: string;
        user: AuthState['user'];
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken ?? null;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    /**
     * Update only access token (used after refresh)
     */
    updateAccessToken: (
      state,
      action: PayloadAction<string>
    ) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },

    /**
     * Logout → Clear all auth state
     */
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  setCredentials,
  updateAccessToken,
  logout,
} = authSlice.actions;

export default authSlice.reducer;