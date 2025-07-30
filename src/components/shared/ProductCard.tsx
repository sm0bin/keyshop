import { Star } from "lucide-react";
// import { useAddItemToCartMutation } from "@/redux/features/cart/cartApi";
import { useAppDispatch } from "@/redux/hook";
// import { addItemToCart } from "@/redux/features/cart/cartSlice";
import { useAddItemToCartMutation } from "@/redux/features/cart/cartApi";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: {
    _id: string;
    image: string;
    title: string;
    brand: string;
    quantity: number;
    price: number;
    rating: number;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [addItemToCart, { isLoading: isAdding }] = useAddItemToCartMutation();
  // const [addItemToCart] = useAddItemToCartMutation();
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    addItemToCart({
      productId: product._id,
      title: product.title,
      image: product.image,
      price: product.price,
      quantity: 1, // Default to 1 for simplicity
    })
      .unwrap()
      .then((response) => {
        console.log("Item added to cart:", response);
        toast.success("Item added to cart successfully!");
        // Optionally dispatch an action or show a success message
      })
      .catch((error) => {
        console.error("Failed to add item to cart:", error);
        toast.error("Failed to add item to cart.");
        // Optionally show an error message
      });
  };
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl text-white p-4 flex flex-col hover:scale-[1.02] transition duration-300">
      <img
        src={product.image}
        alt={product.title}
        className="rounded-xl object-cover h-48 w-full mb-4 border border-white/10"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
        <p className="text-sm text-white/80 mb-1">Brand: {product.brand}</p>
        <p className="text-sm text-white/70 mb-1">
          In Stock: {product.quantity}
        </p>
        <p className="text-xl font-bold mb-1">${product.price}</p>
        <div className="flex items-center gap-1 text-yellow-400 mb-3">
          <Star className="w-4 h-4 fill-yellow-400" />
          <span>{product.rating}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Link className="w-full" to={`/products/${product._id}`}>
          <Button className="w-full" variant={"secondary"}>
            Show Details
          </Button>
        </Link>
        <Button onClick={handleAddToCart} className="">
          Add to Cart
        </Button>
        {/* <button className="w-full px-4 py-2 rounded-lg border border-primary/40 bg-orange-500/80 text-primary font-semibold backdrop-blur-md hover:bg-primary/30 hover:text-white transition">
          Add to Cart
        </button> */}
      </div>
    </div>
  );
};

export default ProductCard;
