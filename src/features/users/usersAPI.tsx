// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const usersApi = createApi({
//   reducerPath: "usersApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "https://your-backend-url.com/api" }),
//   endpoints: (builder) => ({
//     getUsers: builder.query({
//       query: () => "/users",
//     }),
//     getUserById: builder.query({
//       query: (id) => `/users/${id}`,
//     }),
//     updateUser: builder.mutation({
//       query: ({ id, userData }) => ({
//         url: `/users/${id}`,
//         method: "PUT",
//         body: userData,
//       }),
//     }),
//     deleteUser: builder.mutation({
//       query: (id) => ({
//         url: `/users/${id}`,
//         method: "DELETE",
//       }),
//     }),
//   }),
// });

// export const {
//   useGetUsersQuery,
//   useGetUserByIdQuery,
//   useUpdateUserMutation,
//   useDeleteUserMutation,
// } = usersApi;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "https://rentals-dxd5gdg2c0a8dhdt.southafricanorth-01.azurewebsites.net";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include", // Ensures cookies (if needed) are sent
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),
    updateUser: builder.mutation({
      query: ({ userId, userData }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: userData,
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