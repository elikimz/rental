import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'https://rentalapi-mqqc.onrender.com';

export const paymentsApi = createApi({
  reducerPath: 'paymentsApi',
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
    createPayment: builder.mutation({
      query: (paymentData) => ({
        url: '/payments/pay',
        method: 'POST',
        body: paymentData,
      }),
    }),

    getAllPayments: builder.query({
      query: () => '/payments/',
    }),

    getPaymentById: builder.query({
      query: (paymentId) => `/payments/${paymentId}`,
    }),

    updatePayment: builder.mutation({
      query: ({ id, paymentData }) => ({
        url: `/payments/${id}`,
        method: 'PUT',
        body: paymentData,
      }),
    }),

    deletePayment: builder.mutation({
      query: (id) => ({
        url: `/payments/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useGetAllPaymentsQuery,
  useGetPaymentByIdQuery,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentsApi;
