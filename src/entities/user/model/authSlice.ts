// features/auth/model/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthTokens, LoginPayload } from '../types';

interface AuthState {
  tokens: AuthTokens | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  tokens: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (_state, _action: PayloadAction<LoginPayload>) => {
      return { tokens: null, loading: true, error: null };
    },
    loginSuccess: (state, action: PayloadAction<AuthTokens>) => {
      state.tokens = action.payload;
      state.loading = false;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure } = authSlice.actions;
export const authReducer = authSlice.reducer;
