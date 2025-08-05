import React, { useState } from "react";
import { Star, ShoppingCart, Eye } from "lucide-react";

// Mock product data for demo
const product = {
  _id: "1",
  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e/400x300",
  title: "Wireless Bluetooth Headphones",
  brand: "TechSound",
  quantity: 15,
  price: 89.99,
  rating: 4.5,
};

const ProductCard = () => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="group bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-lg hover:shadow-2xl text-white p-5 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-slate-600/60 max-w-sm mx-auto">
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
          {product.quantity > 0 ? "In Stock" : "Out of Stock"}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-2">
        <h3 className="text-lg font-semibold leading-tight line-clamp-2 group-hover:text-blue-300 transition-colors">
          {product.title}
        </h3>

        <p className="text-sm text-slate-400 font-medium">{product.brand}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <p className="text-sm text-slate-400">
            Stock:{" "}
            <span className="text-white font-medium">{product.quantity}</span>
          </p>
        </div>

        <div className="pt-1">
          <p className="text-2xl font-bold text-green-400">${product.price}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-700/80 hover:bg-slate-600/80 border border-slate-600/50 hover:border-slate-500/50 rounded-lg transition-all duration-200 text-sm font-medium hover:shadow-md">
          <Eye className="w-4 h-4" />
          Details
        </button>

        <button
          onClick={handleAddToCart}
          disabled={isAdding || product.quantity === 0}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg transition-all duration-200 text-sm font-medium hover:shadow-md disabled:opacity-50"
        >
          <ShoppingCart className="w-4 h-4" />
          {isAdding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
