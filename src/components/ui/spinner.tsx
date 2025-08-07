import { Loader } from "lucide-react";

const Spinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader className="animate-spin text-white" size={40} />
    </div>
  );
};

export default Spinner;
