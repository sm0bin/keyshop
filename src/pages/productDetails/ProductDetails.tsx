import React, { useState } from "react";

import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
  Check,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "@/redux/features/product/productApi";

const StarRating = ({ rating, totalStars = 5 }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : index < rating
              ? "fill-yellow-400/50 text-yellow-400"
              : "text-gray-500"
          }`}
        />
      ))}
      <span className="text-sm text-gray-300 ml-2">({rating})</span>
    </div>
  );
};

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const id = useParams().id;
  const {
    data: { data: product },
    isLoading,
    error,
  } = useGetProductQuery(id);
  if (!id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <Alert className="bg-red-900/20 border-red-500">
          <AlertDescription className="text-red-300">
            Product not found
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="animate-pulse text-white text-xl">Loading...</div>
      </div>
    );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="animate-pulse text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <Alert className="bg-red-900/20 border-red-500">
          <AlertDescription className="text-red-300">
            Failed to load product details
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleQuantityChange = (change) => {
    setQuantity((prev) =>
      Math.max(1, Math.min(product.quantity, prev + change))
    );
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Glassmorphism Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-green-400 text-sm font-medium">
                  In Stock
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted
                        ? "fill-red-500 text-red-500"
                        : "text-gray-300"
                    }`}
                  />
                </button>
                <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300">
                  <Share2 className="w-5 h-5 text-gray-300" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/5 rounded-2xl p-8 border border-white/10">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-96 object-contain transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                  <Truck className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-300">Free Shipping</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                  <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-300">2 Year Warranty</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                  <RotateCcw className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-300">30 Day Return</p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Brand & Title */}
              <div>
                <div className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-500/30 mb-3">
                  <span className="text-purple-300 text-sm font-medium">
                    {product.brand}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {product.title}
                </h1>
                <StarRating rating={product.rating} />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    ৳{product.price}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ৳{(product.price * 1.2).toLocaleString()}
                  </span>
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-sm rounded-md">
                    20% OFF
                  </span>
                </div>
                <p className="text-green-400 text-sm">
                  Save ৳{(product.price * 0.2).toLocaleString()}
                </p>
              </div>

              {/* Description */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity & Stock */}
              <div className="flex items-center justify-between bg-white/5 rounded-xl p-4 border border-white/10">
                <div>
                  <p className="text-white font-medium mb-1">Quantity</p>
                  <p className="text-sm text-gray-400">
                    {product.quantity} units available
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200"
                  >
                    <Minus className="w-4 h-4 text-gray-300" />
                  </button>
                  <span className="w-12 text-center text-white font-medium text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.quantity}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200"
                  >
                    <Plus className="w-4 h-4 text-gray-300" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl flex items-center justify-center gap-3"
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart - ৳
                      {(product.price * quantity).toLocaleString()}
                    </>
                  )}
                </button>

                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-xl border border-white/20 transition-all duration-300">
                  Buy Now
                </button>
              </div>

              {/* Key Features */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-white font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    Razer Green mechanical switches
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    Tournament-grade performance
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    Full RGB customization
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    Compact 65% layout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
