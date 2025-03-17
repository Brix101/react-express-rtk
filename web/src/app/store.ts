import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import logger from 'redux-logger';

import authReducer from '../features/auth/authSlice';
import counterReducer from '../features/counter/counterSlice';
import { API } from './api';

export const store = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer,
    auth: authReducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(API.middleware)
      // prepend and concat calls can be chained
      .concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types
