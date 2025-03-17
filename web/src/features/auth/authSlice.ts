import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  token: string | null;
};

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { token } }: PayloadAction<{ token: string }>,
    ) => {
      state.token = token;
    },
    logOut: (state) => {
      state.token = null;
    },
  },
});

export default authSlice.reducer;
