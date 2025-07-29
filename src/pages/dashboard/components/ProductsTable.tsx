import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetProductsQuery } from "@/redux/features/product/productApi";
import { Button } from "@/components/ui/button";

const ProductsTable = () => {
  const { data, isLoading, isError } = useGetProductsQuery(undefined);
  const products = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center flex flex-col items-center justify-center h-screen">
        <p>Error loading products: {isError?.message || "Unknown error"}</p>
      </div>
    );
  }

  return (
    <section className="px-4 md:px-8 lg:pl-20 bg-gradient-to-br h-screen">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
          Products List
        </h2>
        <Button className="px-4 py-2 rounded-lg border border-white/40 bg-white/25 text-white backdrop-blur-md hover:bg-white/35 transition shadow-lg shadow-white/10 font-semibold">
          Add Product
        </Button>
      </div>

      <div className="rounded-md border border-white/30 backdrop-blur-md bg-white/10 h-[80vh] overflow-y-auto">
        <Table>
          <TableHeader className="border-b border-white/20">
            <TableRow>
              <TableHead className="text-white">Image</TableHead>
              <TableHead className="text-white">Title</TableHead>
              <TableHead className="text-white">Brand</TableHead>
              <TableHead className="text-white text-right">Price</TableHead>
              <TableHead className="text-white text-right">Quantity</TableHead>
              <TableHead className="text-white text-right">Rating</TableHead>
              <TableHead className="text-white text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-white/10 bordnor-t border-white/20">
            {products?.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="text-white">{product.title}</TableCell>
                <TableCell className="text-white">{product.brand}</TableCell>
                <TableCell className="text-white text-right">
                  ${product.price}
                </TableCell>
                <TableCell className="text-white text-right">
                  {product.quantity}
                </TableCell>
                <TableCell className="text-white text-right">
                  {product.rating}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    className="text-white hover:text-blue-400"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-white hover:text-red-400"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default ProductsTable;
