import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ReactNode } from 'react';

interface Unit {
  unit_number: ReactNode;
  id: number;
  name: string;
  status: string;
}

interface CreateUnitRequest {
  name: string;
  status: string;
}

export const unitAPI = createApi({
  reducerPath: 'unitAPI',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://rentalapi-s12d.onrender.com',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getAllUnits: builder.query<Unit[], void>({
      query: () => '/units/', // Fixed the double /units issue
    }),
    getUnitById: builder.query<Unit, number>({
      query: (id) => `/units/${id}`,
    }),
    createUnit: builder.mutation<Unit, CreateUnitRequest>({
      query: (newUnit) => ({
        url: '/units/',
        method: 'POST',
        body: newUnit,
      }),
    }),
    updateUnit: builder.mutation<Unit, { id: number; unitData: CreateUnitRequest }>({
      query: ({ id, unitData }) => ({
        url: `/units/${id}`,
        method: 'PUT',
        body: unitData,
      }),
    }),
    deleteUnit: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/units/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllUnitsQuery,
  useGetUnitByIdQuery,
  useCreateUnitMutation,
  useUpdateUnitMutation,
  useDeleteUnitMutation,
} = unitAPI;
