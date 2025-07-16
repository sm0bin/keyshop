import { baseApi } from "@/redux/api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: "/cart/my-cart",
        method: "GET",
      }),
    }),
    addItemToCart: builder.mutation({
      query: (item) => ({
        url: "/cart/add-item",
        method: "POST",
        body: item,
      }),
    }),
    removeItemFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart/remove-item/${id}`,
        method: "DELETE",
      }),
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: "/cart/clear",
        method: "DELETE",
      }),
    }),
    updateCartItem: builder.mutation({
      query: (body) => ({
        url: "/cart/update-item",
        method: "PUT",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddItemToCartMutation,
  useRemoveItemFromCartMutation,
  useClearCartMutation,
  useUpdateCartItemMutation,
} = cartApi;
