import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Tenant {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  user_id: number;
}

interface TenantCreateRequest {
  full_name: string;
  email: string;
  phone_number: string;
}

export const tenantAPI = createApi({
  reducerPath: 'tenantAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rentalapi-s12d.onrender.com',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      } else {
        console.warn("⚠️ No token found in localStorage!");
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getAllTenants: builder.query<Tenant[], void>({
      query: () => {
        console.log("Fetching all tenants...");
        return '/tenant/';
      },
    }),
    getTenantById: builder.query<Tenant, number>({
      query: (id) => {
        console.log(`Fetching tenant with ID: ${id}`);
        return `/tenant/${id}`;
      },
    }),
    registerTenant: builder.mutation<Tenant, TenantCreateRequest>({
      query: (tenantData) => ({
        url: '/tenant/register',
        method: 'POST',
        body: tenantData,
      }),
    }),
    updateTenant: builder.mutation<Tenant, { id: number; tenantData: TenantCreateRequest }>({
      query: ({ id, tenantData }) => ({
        url: `/tenant/${id}`,
        method: 'PUT',
        body: tenantData,
      }),
    }),
    deleteTenant: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/tenant/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllTenantsQuery,
  useGetTenantByIdQuery,
  useRegisterTenantMutation,
  useUpdateTenantMutation,
  useDeleteTenantMutation,
} = tenantAPI;
