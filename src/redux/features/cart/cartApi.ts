import { baseApi } from "@/redux/api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: "/cart/my-cart",
        method: "GET",
      }),
      providesTags: ["cart"],
    }),
    addItemToCart: builder.mutation({
      query: (item) => ({
        url: "/cart/add-item",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["cart"],
    }),
    removeItemFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart/remove-item/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: "/cart/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
    updateCartItem: builder.mutation({
      query: (body) => ({
        url: "/cart/update-item",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["cart"],
    }),
    updateCartAddress: builder.mutation({
      query: (address) => {
        console.log("Updating cart address:", address);
        return {
          url: "/cart/address",
          method: "PUT",
          body: address,
        };
      },
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddItemToCartMutation,
  useRemoveItemFromCartMutation,
  useClearCartMutation,
  useUpdateCartItemMutation,
  useUpdateCartAddressMutation,
} = cartApi;
