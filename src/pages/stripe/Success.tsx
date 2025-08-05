import { CircleCheck } from "lucide-react";
import React from "react";

const Success = () => {
  return (
    <div>
      <CircleCheck className="w-12 h-12 text-green-500 mb-4" />
      <h2 className="text-3xl font-bold mb-4">Your payment was successful</h2>
      <p className="text-lg">Thank you for your purchase!</p>
    </div>
  );
};

export default Success;
