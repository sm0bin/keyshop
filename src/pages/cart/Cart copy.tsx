import { useState } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  X,
  ShoppingBag,
} from "lucide-react";
import {
  useAddItemToCartMutation,
  useClearCartMutation,
  useGetCartQuery,
  useRemoveItemFromCartMutation,
  useUpdateCartItemMutation,
} from "@/redux/features/cart/cartApi";
import type { ICartItem } from "@/types";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error, isError, refetch } =
    useGetCartQuery(undefined);

  const [addItemToCart] = useAddItemToCartMutation();
  // Uncomment these Redux hooks
  const [updateCartItem, { isLoading: isUpdating }] =
    useUpdateCartItemMutation();
  const [removeItemFromCart, { isLoading: isRemoving }] =
    useRemoveItemFromCartMutation();
  const [clearCart, { isLoading: isClearing }] = useClearCartMutation();

  // Fix data structure access - adjust based on your actual API response
  console.log("Cart data:", data);
  const { userId, items, totalItems, totalAmount } = data?.data || data || {};

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartItem({ productId, quantity: newQuantity });
    refetch();
  };

  const handleAddItem = (id: string) => {
    addItemToCart(id);
  };

  const handleRemoveItem = (id: string) => {
    removeItemFromCart(id);
    refetch();
  };

  const handleClearCart = (id: string) => {
    clearCart(id);
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      {/* Cart Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-40 group"
      >
        <div className="relative p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
          <ShoppingCart className="w-6 h-6 text-white group-hover:text-blue-200 transition-colors" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
              {totalItems}
            </span>
          )}
        </div>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white/10 backdrop-blur-md border-l border-white/20 shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-6 h-6" />
                Your Cart
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <p className="text-white/70 mt-1">{totalItems} items</p>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-red-300">
                  Error loading cart: {error.message || "Unknown error"}
                </p>
              </div>
            ) : items?.length ? (
              <div className="p-6 space-y-4">
                {items?.map((item: ICartItem) => (
                  <div
                    key={item.productId}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-16 h-16 object-cover rounded-lg border border-white/20"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-semibold line-clamp-2">
                          {item.product.title}
                        </h3>
                        <p className="text-white/70 text-sm mt-1">
                          ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.productId)}
                        className="p-2 hover:bg-red-500/20 rounded-full transition-colors text-red-300 hover:text-red-200"
                        disabled={isRemoving}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.productId,
                              item.quantity - 1
                            )
                          }
                          // onClick={() => handleRemoveItem(item.productId)}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
                          // disabled={item.quantity <= 1 || isUpdating}
                        >
                          <Minus className="w-4 h-4 text-white" />
                        </button>
                        <span className="text-white font-semibold min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={
                            // () => handleAddItem(item.productId)
                            () =>
                              handleQuantityChange(
                                item.productId,
                                item.quantity + 1
                              )
                          }
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
                          // disabled={isUpdating}
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                      </div>
                      <p className="text-white font-bold">
                        $
                        {(
                          (item.product?.price || item.price) * item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center p-6">
                <ShoppingBag className="w-16 h-16 text-white/30 mb-4" />
                <p className="text-white/70 text-lg">Your cart is empty</p>
                <p className="text-white/50 text-sm mt-2">
                  Add some items to get started
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {items?.length > 0 && (
            <div className="border-t border-white/20 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Total:</span>
                <span className="text-2xl font-bold text-white">
                  ${totalAmount?.toFixed(2)}
                </span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleClearCart(userId)}
                  className="w-full py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 rounded-xl transition-colors font-semibold disabled:opacity-50"
                  disabled={isClearing}
                >
                  {isClearing ? "Clearing..." : "Clear Cart"}
                </button>

                <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
