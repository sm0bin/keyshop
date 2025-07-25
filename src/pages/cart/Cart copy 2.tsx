import { useState } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";

// Mock cart item type
interface ICartItem {
  productId: string;
  quantity: number;
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
}

const Cart = () => {
  // Mock data for demonstration
  const [cartItems, setCartItems] = useState<ICartItem[]>([
    {
      productId: "1",
      quantity: 2,
      product: {
        id: "1",
        title: "Wireless Bluetooth Headphones with Noise Cancellation",
        price: 199.99,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      },
    },
    {
      productId: "2",
      quantity: 1,
      product: {
        id: "2",
        title: "Smart Watch with Fitness Tracking",
        price: 299.99,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      },
    },
    {
      productId: "3",
      quantity: 3,
      product: {
        id: "3",
        title: "USB-C Fast Charging Cable",
        price: 29.99,
        image:
          "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop",
      },
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  // Calculate totals
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
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
        {!cartItems?.length && !isLoading && (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center">
            <ShoppingBag className="w-24 h-24 text-white/30 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-white mb-4">
              Your cart is empty
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Looks like you haven't added any items to your cart yet
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Continue Shopping
            </button>
          </div>
        )}

        {/* Cart Items */}
        {cartItems?.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item: ICartItem) => (
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
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4 text-white" />
                            </button>
                            <span className="text-white font-bold text-lg min-w-[3rem] text-center bg-white/10 rounded-lg py-2 px-4">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                            >
                              <Plus className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <p className="text-white font-bold text-xl">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => handleRemoveItem(item.productId)}
                            className="p-3 hover:bg-red-500/20 rounded-full transition-colors text-red-300 hover:text-red-200 border border-red-500/20"
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
                    <span>${totalAmount.toFixed(2)}</span>
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
                        ${totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Proceed to Checkout
                  </button>

                  <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-colors border border-white/20">
                    Continue Shopping
                  </button>

                  <button
                    onClick={handleClearCart}
                    className="w-full py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 rounded-xl transition-colors font-semibold border border-red-500/20"
                  >
                    Clear Cart
                  </button>
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
