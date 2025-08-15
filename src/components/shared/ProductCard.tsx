import { Star } from "lucide-react";
import { useAddItemToCartMutation } from "@/redux/features/cart/cartApi";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProductCardProps {
  // index: number;
  // delay: number;
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
  // const cardRef = useRef(null);

  // useEffect(() => {
  //   const element = cardRef.current;
  //   if (!element) return;

  //   const ctx = gsap.context(() => {
  //     // Set initial state
  //     gsap.set(element, {
  //       x: -100,
  //       opacity: 0,
  //       scale: 0.8,
  //     });

  //     // Create scroll-triggered animation
  //     gsap.to(element, {
  //       x: 0,
  //       opacity: 1,
  //       scale: 1,
  //       duration: 0.8,
  //       ease: "back.out(1.7)",
  //       scrollTrigger: {
  //         trigger: element,
  //         start: "top 85%",
  //         end: "bottom 20%",
  //         toggleActions: "play none none reverse",
  //       },
  //       delay: delay,
  //     });
  //   }, element);

  //   return () => ctx.revert();
  // }, [delay]);

  const handleAddToCart = () => {
    addItemToCart({
      productId: product._id,
      title: product.title,
      image: product.image,
      price: product.price,
      quantity: 1,
    })
      .unwrap()
      .then((response) => {
        console.log("Item added to cart:", response);
        toast.success("Item added to cart successfully!");
      })
      .catch((error) => {
        console.error("Failed to add item to cart:", error);
        toast.error("Failed to add item to cart.");
      });
  };

  return (
    <div className="product-card bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl text-white p-4 flex flex-col hover:scale-[1.02] transition duration-300">
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
        {/* <p className="text-xs font-medium bg-white/10 text-white/80 px-2 py-1 border border-white/10 w-fit rounded-full">
          {product.brand}
        </p> */}

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
          <p className="text-xl font-bold text-green-400 mb-3">
            ${product.price}
          </p>
        </div>
      </div>

      {/* <div className="flex-1">
        <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
        <p className="text-xs font-medium bg-white/10 text-white/80 px-2 py-1 border border-white/10 w-fit rounded-full">
          {product.brand}
        </p>
        <p className="text-sm text-white/70 mb-1"></p>
        <p className="text-xl mb-1 ">
          <span className="text-green-400 font-medium">${product.price}</span>{" "}
          <span className="text-sm fon">(In Stock: {product.quantity})</span>
        </p>
        <div className="flex items-center gap-1 text-yellow-400 mb-3">
          <Star className="w-4 h-4 fill-yellow-400" />
          <span>{product.rating}</span>
        </div>
      </div> */}
      <div className="grid grid-cols-2 gap-2">
        <Link className="w-full" to={`/products/${product._id}`}>
          <Button className="w-full" variant={"secondary"}>
            Show Details
          </Button>
        </Link>
        <Button
          onClick={handleAddToCart}
          className=""
          disabled={isAdding || product.quantity === 0}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
