import { baseApi } from "../api/baseApi";

const stripeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (data) => ({
        url: "/stripe/create-checkout-session",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateCheckoutSessionMutation } = stripeApi;
//  const makePayment = async () => {
//     const stripe = await loadStripe(
//       "pk_test_51Rqrc8FIul2piRnkQOku9aWaI8EEzTrteGTF4Yym8Zb9GrPxwSLki748KsgV61sB7QjOedlaoUVd8EvpRO7OHpEK00DxbkFMqS"
//     );

//     const body = {
//       products: [
//         {
//           title: "Cart Items",
//           img: "cart_image_url",
//           price: 200,
//           quantity: 10,
//         },
//         {
//           title: "Another Item",
//           img: "another_image_url",
//           price: 300,
//           quantity: 5,
//         },
//       ],
//     };
//     const headers = {
//       "Content-Type": "application/json",
//     };
//     const response = await fetch(
//       "http://localhost:5000/api/create-checkout-session",
//       {
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify(body),
//       }
//     );

//     const session = await response.json();

//     const result = stripe.redirectToCheckout({
//       sessionId: session.id,
//     });

//     if (result.error) {
//       console.log(result.error);
//     }
//   };
