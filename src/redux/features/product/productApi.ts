import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (args) => {
        console.log("Fetching products with args:", args);

        // Filter out undefined/null values and build params
        const params = args
          ? Object.fromEntries(
              Object.entries(args)
                .filter(
                  ([_, value]) =>
                    value !== undefined && value !== null && value !== ""
                )
                .map(([key, value]) => [key, String(value)])
            )
          : {};

        console.log("Query parameters:", params);

        return {
          url: "/products",
          params,
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
      query: (product) => {
        console.log("Updating product:", product);
        return {
          url: `/products/${product._id}`,
          method: "PUT",
          body: product,
        };
      },
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
