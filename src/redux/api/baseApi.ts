import {
  DefinitionType,
  createApi,
  fetchBaseQuery,
  type BaseQueryApi,
  type BaseQueryFn,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { logout, login } from "../features/auth/authSlice";
import { toast } from "sonner";
import type { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result?.error?.status === 404 ||
    result?.error?.status === 500 ||
    result?.error?.status === 403
  ) {
    const errorData = result?.error?.data as { message?: string };
    toast.error(errorData?.message || "Not found");
  }

  if (result?.error?.status === 401) {
    // toast.error(result?.error?.data?.message || "Unauthorized");

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(login({ user, token: data?.data?.accessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["products"],
  endpoints: () => ({}),
});
