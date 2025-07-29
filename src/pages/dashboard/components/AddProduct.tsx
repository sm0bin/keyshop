import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="w-full max-w-md glass-card rounded-2xl p-8 shadow-xl border border-white/20 backdrop-blur-md mx-auto text-white">
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Image URL:</label>
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
          <label htmlFor="title">Title:</label>
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
          <label htmlFor="brand">Brand:</label>
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
          <label htmlFor="quantity">Quantity:</label>
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
          <label htmlFor="price">Price:</label>
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
          <label htmlFor="rating">Rating:</label>
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
          <label htmlFor="description">Description:</label>
          <Textarea
            id="description"
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <Button
          className="bg-white text-black hover:bg-gray-200 font-bold w-full mt-4"
          type="submit"
        >
          Add Product
        </Button>
      </form>
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
