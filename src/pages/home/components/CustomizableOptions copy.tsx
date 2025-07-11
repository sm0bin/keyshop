import React from "react";
import {
  SlidersHorizontal,
  Lightbulb,
  MousePointerClick,
  Settings,
} from "lucide-react";

const customizationPoints = [
  {
    icon: SlidersHorizontal,
    title: "Switch Choices",
    desc: "Choose from linear, tactile, or clicky switches to match your style.",
  },
  {
    icon: Lightbulb,
    title: "RGB Lighting",
    desc: "Personalize lighting effects and colors per key.",
  },
  {
    icon: MousePointerClick,
    title: "Keycap Styles",
    desc: "Swap keycaps for different profiles, materials, and colors.",
  },
  {
    icon: Settings,
    title: "Layout Options",
    desc: "Pick between full-size, TKL, 75%, or 60% layouts.",
  },
];

const CustomizableOptions: React.FC = () => {
  return (
    <section className=" py-12 px-4">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Customizable Options
        </h2>
        <p className="text-gray-300 mt-2">
          Tailor your keyboard to match your needs and personality.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {customizationPoints.map((item, idx) => (
          <div
            key={idx}
            className="backdrop-blur-md bg-white/10 border border-white/10 p-6 rounded-2xl text-white shadow-md hover:bg-white/20 transition"
          >
            <item.icon className="w-8 h-8 text-green-400 mb-4" />
            <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
            <p className="text-sm text-gray-200">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomizableOptions;
