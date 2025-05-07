import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ limit, skip }) => `products?limit=${limit}&skip=${skip}`,
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
    getCategoryList: builder.query({
      query: () => 'products/category-list',
    }),
    getProductsByCategory: builder.query({
      query: (category) => `products/category/${category}`,
    }),
    SearchProducts: builder.query({
      query: (search) => `products/search?q=${search}`,
    }),
  }),
})

export const { 
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoryListQuery,
  useGetProductsByCategoryQuery,
  useSearchProductsQuery,
} = productsApi