import { Star } from "lucide-react";
// import { useAddItemToCartMutation } from "@/redux/features/cart/cartApi";
import { useAppDispatch } from "@/redux/hook";
import { addItemToCart } from "@/redux/features/cart/cartSlice";

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
  // const [addItemToCart] = useAddItemToCartMutation();
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
    // addItemToCart({
    //   productId: product._id,
    //   quantity: 1,
    //   price: product.price,
    // });
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
      <div className="flex justify-between gap-2 mt-auto">
        <button className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition">
          Show Details
        </button>
        <button
          onClick={handleAddToCart}
          className="w-full px-4 py-2 rounded-lg border border-white/40 bg-white/25 text-white backdrop-blur-md hover:bg-white/35 transition shadow-lg shadow-white/10 font-semibold"
        >
          Add to Cart
        </button>
        {/* <button className="w-full px-4 py-2 rounded-lg border border-primary/40 bg-orange-500/80 text-primary font-semibold backdrop-blur-md hover:bg-primary/30 hover:text-white transition">
          Add to Cart
        </button> */}
      </div>
    </div>
  );
};

export default ProductCard;
