import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthTokens, LoginPayload } from '../types';

interface AuthState {
  tokens: AuthTokens | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  tokens: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (_state, _action: PayloadAction<LoginPayload>) => {
      return { tokens: null, loading: true, error: null, isAuthenticated: false };
    },
    loginSuccess: (state, action: PayloadAction<AuthTokens>) => {
      state.tokens = action.payload;
      state.loading = false;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
      state.isAuthenticated = false;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure } = authSlice.actions;
export const authReducer = authSlice.reducer;
