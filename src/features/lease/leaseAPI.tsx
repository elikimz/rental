import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Lease {
  [x: string]: ReactNode;
  [x: string]: ReactNode;
  id: number;
  tenant_id: number;
  unit_id: number;
  start_date: string;
  end_date: string;
  rent_amount: number;
  deposit_amount: number;
  lease_status: string;
  created_at: string;
  updated_at: string;
}

interface LeaseCreateRequest {
  tenant_id: number;
  unit_id: number;
  start_date: string;
  end_date: string;
  rent_amount: number;
  deposit_amount: number;
}

export const leaseAPI = createApi({
  reducerPath: 'leaseAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rentals-dxd5gdg2c0a8dhdt.southafricanorth-01.azurewebsites.net',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllLeases: builder.query<Lease[], void>({
      query: () => '/leases/',
    }),
    getLeaseById: builder.query<Lease, number>({
      query: (id) => `/leases/${id}`,
    }),
    createLease: builder.mutation<Lease, LeaseCreateRequest>({
      query: (leaseData) => ({
        url: '/leases/',
        method: 'POST',
        body: leaseData,
      }),
    }),
    updateLease: builder.mutation<Lease, { id: number; leaseData: LeaseCreateRequest }>({
      query: ({ id, leaseData }) => ({
        url: `/leases/${id}`,
        method: 'PUT',
        body: leaseData,
      }),
    }),
    deleteLease: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/leases/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllLeasesQuery,
  useGetLeaseByIdQuery,
  useCreateLeaseMutation,
  useUpdateLeaseMutation,
  useDeleteLeaseMutation,
} = leaseAPI;

// 🚀 API layer ready! Let’s wire this up to the component next. ✨
