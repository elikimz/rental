import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Payment {
  payment_id: string;
  amount_paid: number;
  payment_status: string;
  checkout_url: string;
}

interface CreatePaymentRequest {
  amount_paid: number;
}

export const paymentAPI = createApi({
  reducerPath: 'paymentAPI',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://renta-dxdls5gdg2c0a8dhdt.southafricanorth-01.azurewebsites.net',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    createPayment: builder.mutation<Payment, CreatePaymentRequest>({
      query: (paymentData) => ({
        url: '/payments/pay',
        method: 'POST',
        body: paymentData,
      }),
    }),
    getPaymentById: builder.query<Payment, string>({
      query: (paymentId) => `/payments/${paymentId}`,
    }),
    getAllPayments: builder.query<Payment[], void>({
      query: () => '/payments/',
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useGetPaymentByIdQuery,
  useGetAllPaymentsQuery,
} = paymentAPI;

// This setup lets you create payments, fetch a payment by ID, or get all payments! 🎯 Let me know if you want me to tweak anything or wire this up in your component. 🚀