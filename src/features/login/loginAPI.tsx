import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginAPI = createApi({
  reducerPath: "loginAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://rentalapi-mqqc.onrender.com/" }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/token",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: credentials, // Send encoded string directly
      }),
    }),
    requestPasswordReset: builder.mutation({
      query: (email) => ({
        url: "/auth/request-password-reset",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // Wrap email properly
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRequestPasswordResetMutation } = loginAPI;
