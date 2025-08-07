import ProductCard from "@/components/shared/ProductCard";
import { Link } from "@/components/ui/link";
import { useGetProductsQuery } from "@/redux/features/product/productApi";
import type { IProduct } from "@/types";

const FeaturedProducts = () => {
  const { data, isLoading, error } = useGetProductsQuery(undefined);

  if (isLoading) {
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (error) {
    console.error("Error loading products:", error);
    return (
      <div className="text-red-500 text-center flex flex-col items-center justify-center h-screen">
        <p>Error loading products: {error?.message || "Unknown error"}</p>
      </div>
    );
  }

  const products = data?.data || [];

  return (
    <section className="">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Featured Products
        </h2>
        <p className="text-gray-300 mt-2">Keyboards for every type of gamer</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {products?.slice(0, 6).map((product: IProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <Link className="mt-10 block mx-auto w-fit" to="/products">
        View All
      </Link>
    </section>
  );
};

export default FeaturedProducts;
