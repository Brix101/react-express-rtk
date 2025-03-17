import { baseApi } from '@/app/api';
import { SignInUserInput } from './authSchema';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface SignInResponse {
  user: User;
  accessToken: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<SignInResponse, SignInUserInput>({
      query: (body) => ({
        url: '/auth/signin',
        method: 'POST',
        body: body,
      }),
    }),
    getMe: build.query<{ user: User }, void>({
      query: () => '/auth/me',
    }),
    refreshToken: build.query<SignInResponse, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
    }),
  }),
});

export const { useGetMeQuery, useSignInMutation, useRefreshTokenQuery } =
  authApi;
