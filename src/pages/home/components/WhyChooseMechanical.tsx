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
    <section className=" py-12 px-4 grid grid-cols-2">
      <div>
        <div className=" mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Why Choose Mechanical Keyboards?
          </h2>
          <p className="text-gray-300 mt-2">
            Experience precision, durability, and customization in every
            keystroke.
          </p>
        </div>

        <div className="grid grid-cols-1  gap-4 max-w-6xl mx-auto">
          {choosePoints.map((point, idx) => (
            <div
              key={idx}
              //   className="backdrop-blur-md bg-white/10 border border-white/10 p-4 rounded-2xl text-white shadow-md hover:bg-white/20 transition flex items-center gap-4"
              className="flex items-center gap-4"
            >
              <div className="backdrop-blur-md bg-white/10 border border-white/10 p-4 rounded-2xl text-white shadow-md hover:shadow-2xl hover:bg-white/20 transition flex items-center justify-center ml-12 hover:shadow-white/50">
                <point.icon className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-1 text-white">
                  {point.title}
                </h4>
                <p className="text-sm text-gray-200">{point.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <img
          src="https://i.ibb.co/39GGfzjy/k-24.jpg"
          alt="Keyboard"
          className="w-full h-full object-cover rounded-xl border border-white/10 overflow-hidden"
        />
      </div>
    </section>
  );
};

export default WhyChooseMechanical;
