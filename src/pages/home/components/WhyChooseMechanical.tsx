import React from "react";
import { Keyboard, Volume2, Zap, RotateCw } from "lucide-react";

const choosePoints = [
  {
    icon: Keyboard,
    title: "Tactile Feedback",
    desc: "Feel every keystroke with precision and satisfaction.",
  },
  {
    icon: Volume2,
    title: "Audible Clicks",
    desc: "Clicky switches provide a satisfying sound and feedback.",
  },
  {
    icon: Zap,
    title: "Fast Response",
    desc: "Mechanical switches reduce latency for pro-level performance.",
  },
  {
    icon: RotateCw,
    title: "Long Lifespan",
    desc: "Durable switches rated for millions of key presses.",
  },
];

const WhyChooseMechanical: React.FC = () => {
  return (
    <section className=" py-12 px-4">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Why Choose Mechanical Keyboards?
        </h2>
        <p className="text-gray-300 mt-2">
          Experience precision, durability, and customization in every
          keystroke.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {choosePoints.map((point, idx) => (
          <div
            key={idx}
            className="backdrop-blur-md bg-white/10 border border-white/10 p-6 rounded-2xl text-white shadow-md hover:bg-white/20 transition"
          >
            <point.icon className="w-8 h-8 text-blue-400 mb-4" />
            <h4 className="text-lg font-semibold mb-1">{point.title}</h4>
            <p className="text-sm text-gray-200">{point.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseMechanical;
