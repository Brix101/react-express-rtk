import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authApi, SignInResponse, User } from './authApi';

export type AuthState = {
  token: string | null;
  user: User | null;
};

const initialState: AuthState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<SignInResponse>) => {
      state.token = payload.accessToken;
      state.user = payload.user;
    },
    logOut: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.signIn.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.accessToken;
        state.user = payload.user;
      },
    );
    builder.addMatcher(
      authApi.endpoints.refreshToken.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.accessToken;
        state.user = payload.user;
      },
    );
  },
});

export const { setCredentials, logOut } = authSlice.actions;
