import { useState } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import {
  useAddItemToCartMutation,
  useClearCartMutation,
  useGetCartQuery,
  useRemoveItemFromCartMutation,
  useUpdateCartItemMutation,
} from "@/redux/features/cart/cartApi";
import type { ICartItem } from "@/types";
// import {
//   addItemToCart,
//   clearCart,
//   removeItemFromCart,
//   // updateCartItem,
// } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hook";
// import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const { data, isLoading, error, isError, refetch } =
    useGetCartQuery(undefined);
  const [addItemToCart, { isLoading: isAdding }] = useAddItemToCartMutation();
  const [updateCartItem, { isLoading: isUpdating }] =
    useUpdateCartItemMutation();
  const [removeItemFromCart, { isLoading: isRemoving }] =
    useRemoveItemFromCartMutation();
  const [clearCart, { isLoading: isClearing }] = useClearCartMutation();

  // const cart = useAppSelector((state) => state.cart);
  // const { items, totalAmount, totalItems } = cart;
  // console.log("Cart items:", cart);
  // Fix data structure access - adjust based on your actual API response
  // console.log("Cart data:", data);
  const { userId, items, totalItems, totalAmount } = data?.data || data || {};

  const handleQuantityChange = (productId, newQuantity) => {
    // if (newQuantity < 1) return;
    // updateCartItem({ productId, quantity: newQuantity });
    updateCartItem({ productId, quantity: newQuantity });
    // refetch();
  };

  const handleAddItem = (id: string) => {
    addItemToCart(id);
  };

  const handleRemoveItem = (id: string) => {
    removeItemFromCart(id);
    // refetch();
  };

  const handleClearCart = (id: string) => {
    clearCart(id);
    // refetch();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              to={-1}
              variant={"ghost"}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </Link>
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              <ShoppingBag className="w-8 h-8" />
              Shopping Cart
            </h1>
          </div>
          <p className="text-white/70 text-lg ml-14">
            {totalItems
              ? `${totalItems} item${totalItems > 1 ? "s" : ""} in your cart`
              : "Your cart is empty"}
          </p>
        </div>

        {/* Empty Cart State */}
        {!items?.length && (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center">
            <ShoppingBag className="w-24 h-24 text-white/30 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-white mb-4">
              Your cart is empty
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Looks like you haven't added any items to your cart yet
            </p>
            <Link to="/products">Continue Shopping</Link>
          </div>
        )}

        {/* Cart Items */}
        {items?.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item: ICartItem) => (
                <div
                  key={item.productId}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl border border-white/20 shadow-md"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-white font-semibold text-lg leading-tight">
                          {item.product.title}
                        </h3>
                        <p className="text-white/60 text-sm mt-2">
                          Price: ${item.product.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity Controls & Actions */}
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                          <span className="text-white/70 text-sm">
                            Quantity:
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.productId,
                                  item.quantity - 1
                                )
                              }
                              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
                              disabled={item.quantity <= 1 || isUpdating}
                            >
                              <Minus className="w-4 h-4 text-white" />
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const newQuantity =
                                  parseInt(e.target.value) || 1;
                                if (newQuantity > 0) {
                                  handleQuantityChange(
                                    item.productId,
                                    newQuantity
                                  );
                                }
                              }}
                              min="1"
                              className="text-white font-bold text-lg min-w-[3rem] text-center bg-white/10 rounded-lg py-2 px-4 border border-white/20 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                              disabled={isUpdating}
                            />
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
                              disabled={isUpdating}
                            >
                              <Plus className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <p className="text-white font-bold text-xl">
                            $
                            {(
                              (item.product?.price || item.price) *
                              item.quantity
                            ).toFixed(2)}
                          </p>
                          <button
                            onClick={() => handleRemoveItem(item.productId)}
                            className="p-3 hover:bg-red-500/20 rounded-full transition-colors text-red-300 hover:text-red-200 border border-red-500/20"
                            disabled={isRemoving}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sticky top-8 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6" />
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-white/70">
                    <span>Items ({totalItems}):</span>
                    <span>${totalAmount?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-white/70">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between items-center text-white/70">
                    <span>Tax:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t border-white/20 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold text-lg">
                        Total:
                      </span>
                      <span className="text-2xl font-bold text-white">
                        ${totalAmount?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Buttons */}
                <div className="space-y-3">
                  <Link className="w-full block " to="/checkout">
                    Proceed to Checkout
                  </Link>

                  <Link
                    className="w-full block"
                    variant={"secondary"}
                    to="/checkout"
                  >
                    Continue Shopping
                  </Link>

                  <Button
                    onClick={() => handleClearCart(userId)}
                    className="w-full"
                    variant={"destructive"}
                    disabled={isClearing}
                  >
                    {isClearing ? "Clearing..." : "Clear Cart"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
