import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { RootState } from './store';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
  credentials: 'include',
});

// token interceptor
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // if (result.error && result.error.status === 401) {
  //   // try to get a new token
  //   const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
  //   if (refreshResult.data) {
  //     // store the new token
  //     api.dispatch(setCredentials(refreshResult.data));
  //     // retry the initial query
  //     result = await baseQuery(args, api, extraOptions);
  //   } else {
  //     api.dispatch(logOut());
  //   }
  // }

  return result;
};

export const API = createApi({
  reducerPath: 'baseAPI',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (build) => ({
    getBEStatus: build.query<{ ok: boolean }, unknown>({
      query: () => 'status',
    }),
  }),
});

export const { useGetBEStatusQuery } = API;
