import { CircleX } from "lucide-react";
import React from "react";

const Cancel = () => {
  return (
    <div>
      <CircleX className="w-12 h-12 text-red-500 mb-4" />
      <h2 className="text-3xl font-bold mb-4">Your payment was cancelled</h2>
      <p className="text-lg">Please try again!</p>
    </div>
  );
};

export default Cancel;
