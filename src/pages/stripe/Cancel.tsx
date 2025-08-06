import { Link } from "@/components/ui/link";
import { CircleX } from "lucide-react";

const Cancel = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-500/80 backdrop-blur-sm rounded-full p-4 border border-red-300/30">
            <CircleX className="w-16 h-16 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-white">
          Payment Cancelled
        </h2>
        <p className="text-lg text-white/90 mb-6">
          Your payment was cancelled. No charges have been made to your account.
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 mb-4">
          <p className="text-sm text-white/80">
            Feel free to try again when you're ready.
          </p>
        </div>
        <Link to="/products" variant="secondary">
          Return to Store
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
