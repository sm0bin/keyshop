import ProductCard from "@/components/shared/ProductCard";
import { useGetProductsQuery } from "@/redux/features/product/productApi";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery(undefined);
  console.log("Products:", data);
  const products = data?.data || [];
  return (
    <section className="py-16 px-4 md:px-8 lg:px-20 bg-gradient-to-br from-black via-gray-900 to-neutral-900 min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
        Mechanical Keyboards
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
