import { useState, useEffect } from "react";
import ProductCard from "@/components/shared/ProductCard";
import { useGetProductsQuery } from "@/redux/features/product/productApi";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";

const Products = () => {
  // Filter and search states
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Build query parameters
  const queryParams = {
    ...(debouncedSearchTerm && { search: debouncedSearchTerm }),
    ...(minPrice && { minPrice: parseFloat(minPrice) }),
    ...(maxPrice && { maxPrice: parseFloat(maxPrice) }),
    ...(sortBy && { sortBy }),
  };

  // Only pass params if there are any filters applied
  const hasFilters = Object.keys(queryParams).length > 0;
  const { data, isLoading, isError } = useGetProductsQuery(
    hasFilters ? queryParams : undefined
  );

  const products = data?.data || [];

  console.log("Products Query Params:", queryParams);
  console.log("Products:", data);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("");
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    console.error("Error loading products:", isError);
    return (
      <div className="text-red-500 text-center flex flex-col items-center justify-center h-screen">
        <p>Error loading products: {isError?.message || "Unknown error"}</p>
      </div>
    );
  }

  return (
    <section className="pt-20 px-4 md:px-8 lg:px-20 bg-gradient-to-br from-black via-gray-900 to-neutral-900 min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
        Mechanical Keyboards
      </h2>

      {/* Search and Filter Controls */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          {/* Search Bar */}
          <div className="lg:col-span-2">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Search Products
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by name or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Price Range Filters */}
          <div>
            <label
              htmlFor="minPrice"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Min Price ($)
            </label>
            <input
              id="minPrice"
              type="number"
              placeholder="0"
              min="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="maxPrice"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Max Price ($)
            </label>
            <input
              id="maxPrice"
              type="number"
              placeholder="1000"
              min="0"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="sortBy"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Sort By
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            >
              <option value="">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasFilters && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-gray-300 text-sm">Active filters:</span>
              {debouncedSearchTerm && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-600 text-white">
                  Search: "{debouncedSearchTerm}"
                </span>
              )}
              {minPrice && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-600 text-white">
                  Min: ${minPrice}
                </span>
              )}
              {maxPrice && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-600 text-white">
                  Max: ${maxPrice}
                </span>
              )}
              {sortBy && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-600 text-white">
                  Sort: {sortBy === "price-low" ? "Price ↑" : "Price ↓"}
                </span>
              )}
              {/* Clear Filters Button */}
              <Button onClick={clearFilters} className="bg-red-500/30 ml-auto">
                Clear Filters
              </Button>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-gray-300 text-sm">
            {isLoading
              ? "Loading products..."
              : `Showing ${products.length} products`}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      {!isLoading && products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-4">
            No products found matching your criteria
          </div>
          <button
            onClick={clearFilters}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
