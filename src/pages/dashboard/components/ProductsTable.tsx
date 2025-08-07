import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/redux/features/product/productApi";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { Link } from "@/components/ui/link";
import type { IProduct } from "@/types";
import Spinner from "@/components/ui/spinner";

const ProductsTable = () => {
  const { data, isLoading, isError } = useGetProductsQuery(undefined);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const products = data?.data || [];

  // State for each product's edit form
  const [editingProduct, setEditingProduct] = React.useState({
    id: "",
    image: "",
    title: "",
    brand: "",
    quantity: 0,
    price: 0,
    rating: 0,
    description: "",
  });
  const [dialogOpen, setDialogOpen] = React.useState(false);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center flex flex-col items-center justify-center h-screen">
        <p>Error loading products: {isError?.message || "Unknown error"}</p>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete product.");
    }
  };

  const openEditDialog = (product: IProduct) => {
    setEditingProduct({
      _id: product._id,
      image: product.image,
      title: product.title,
      brand: product.brand,
      quantity: product.quantity,
      price: product.price,
      rating: product.rating,
      description: product.description,
    });
    setDialogOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setEditingProduct((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      await updateProduct(editingProduct).unwrap();
      toast.success("Product updated successfully!");
      setDialogOpen(false);
      setEditingProduct(null);
    } catch (error) {
      toast.error(error.message || "Failed to update product.");
      console.error("Error updating product:", error);
    }
  };

  return (
    <section className="px-4 md:px-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
          Products List
        </h2>
        <Link to="add-products">Add Product</Link>
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
          <TableBody className="divide-y divide-white/10 border-t border-white/20">
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
                <TableCell className="text-right flex items-center justify-end gap-2">
                  <Button
                    // variant="outline"
                    onClick={() => openEditDialog(product)}
                  >
                    Edit
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="rounded-full bg-red-400/30 border border-red-400 hover:bg-red-400/40 hover:text-white"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white/10 backdrop-blur-md border border-white/10 text-gray-200">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Delete?</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-300">
                          This action cannot be undone. This will permanently
                          delete product:{" "}
                          <span className="font-semibold">{product.title}</span>
                          .
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-white/20 rounded-full border border-white/20   hover:bg-white/30 hover:text-white">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(product._id)}
                        >
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog - Outside the table to avoid nesting issues */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-xl bg-white/10 backdrop-blur-md border border-white/10 text-gray-200">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription className="text-gray-300">
              Make changes to your product here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate}>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  className="border border-white/20"
                  id="image"
                  name="image"
                  value={editingProduct?.image || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  className="border border-white/20"
                  id="title"
                  name="title"
                  value={editingProduct?.title || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  className="border border-white/20"
                  id="brand"
                  name="brand"
                  value={editingProduct?.brand || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  className="border border-white/20"
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={editingProduct?.quantity || 0}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="rating">Rating</Label>
                <Input
                  className="border border-white/20"
                  id="rating"
                  name="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={editingProduct?.rating || 0}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <Input
                  className="border border-white/20"
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={editingProduct?.price || 0}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  className="border border-white/20"
                  id="description"
                  name="description"
                  value={editingProduct?.description || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProductsTable;
