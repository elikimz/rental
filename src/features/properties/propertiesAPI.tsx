import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'https://rentals-dxd5gdg2c0a8dhdt.southafricanorth-01.azurewebsites.net';

export const propertiesApi = createApi({
  reducerPath: 'propertiesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createProperty: builder.mutation({
      query: (propertyData) => ({
        url: '/properties/',
        method: 'POST',
        body: propertyData,
      }),
    }),

    getPropertyById: builder.query({
      query: (propertyId) => `/properties/${propertyId}`,
    }),

    getAllProperties: builder.query({
      query: () => '/properties/',
    }),

    updateProperty: builder.mutation({
      query: ({ propertyId, propertyData }) => ({
        url: `/properties/${propertyId}`,
        method: 'PUT',
        body: propertyData,
      }),
    }),

    deleteProperty: builder.mutation({
      query: (propertyId) => ({
        url: `/properties/${propertyId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreatePropertyMutation,
  useGetPropertyByIdQuery,
  useGetAllPropertiesQuery,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} = propertiesApi;

// Now every request will automatically include the user's token from local storage! 🚀
