// paymentAPI.tsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rentals-dxd5gdg2c0a8dhdt.southafricanorth-01.azurewebsites.net' }),
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (paymentData) => ({
        url: '/payments/pay',
        method: 'POST',
        body: paymentData,
      }),
    }),
    getPaymentStatus: builder.query({
      query: (paymentId) => `/${paymentId}`,
    }),
  }),
});

export const { useCreatePaymentMutation, useGetPaymentStatusQuery } = paymentApi;