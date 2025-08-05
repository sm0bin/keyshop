import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddProductMutation } from "@/redux/features/product/productApi";
import React from "react";
import { toast } from "sonner";

const AddProduct = () => {
  const [addProduct, { isLoading, isError }] = useAddProductMutation();
  const [formData, setFormData] = React.useState({
    image: "",
    title: "",
    brand: "",
    quantity: 0,
    price: 0,
    rating: 0,
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Product added:", formData);
    addProduct(formData)
      .unwrap()
      .then((response) => {
        console.log("Product added successfully:", response);
        // Optionally, reset the form or show a success message
        setFormData({
          image: "",
          title: "",
          brand: "",
          quantity: 0,
          price: 0,
          rating: 0,
          description: "",
        });
        toast.success("Product added successfully!");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        toast.error(error.data?.message || "Failed to add product.");
      });
  };
  return (
    <div className="w-full flex justify-center items-center h-[90vh]">
      <div className="w-md glass-card rounded-2xl p-8 shadow-xl border border-white/20 backdrop-blur-md mx-auto text-white">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Add New Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label htmlFor="image">Image URL:</Label>
            <Input
              type="text"
              id="image"
              name="image"
              required
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="title">Title:</Label>
            <Input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="brand">Brand:</Label>
            <Input
              type="text"
              id="brand"
              name="brand"
              required
              value={formData.brand}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="quantity">Quantity:</Label>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              required
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="price">Price:</Label>
            <Input
              type="number"
              id="price"
              name="price"
              required
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="rating">Rating:</Label>
            <Input
              type="number"
              id="rating"
              name="rating"
              required
              value={formData.rating}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="description">Description:</Label>
            <Textarea
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <Button className="w-full" type="submit">
            Add Product
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

// const productSchema = new Schema<IProduct>({
//   image: {
//     type: String,
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   brand: {
//     type: String,
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   rating: {
//     type: Number,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   isDeleted: {
//     type: Boolean,
//     default: false,
//   },
// });
