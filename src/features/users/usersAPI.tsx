import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "https://rentals-dxd5gdg2c0a8dhdt.southafricanorth-01.azurewebsites.net";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      console.log("Auth Token:", token); // Debugging log to check token

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        console.warn("No token found in localStorage!");
      }

      return headers;
    },
    credentials: "include", // Ensures cookies (if needed) are sent
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users/",
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),
    updateUser: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: userData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
