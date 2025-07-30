import { baseApi } from "../../api/baseApi";

interface TQueryParams {
  name?: string;
  value?: string;
}

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (args) => {
        console.log("Fetching products with args:", args);
        const params = new URLSearchParams();

        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            if (value) {
              params.append(key, value as string);
            }
          });
        }
        console.log("Query parameters:", params.toString());
        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["product"],
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/products/${product._id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
