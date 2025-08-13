import { Link } from "@/components/ui/link";
import { CircleCheck } from "lucide-react";

const Success = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 p-8 max-w-4xl w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-500/80 backdrop-blur-sm rounded-full p-4 border border-green-500/30">
            <CircleCheck className="w-16 h-16 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-white">
          Payment Successful!
        </h2>
        <p className="text-lg text-white/90 mb-6">
          Thank you for your purchase. Your transaction has been completed
          successfully.
        </p>
        <Link to="/products" className="">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Success;
