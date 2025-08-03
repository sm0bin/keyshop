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
    <section className="grid grid-cols-2 gap-20">
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

        <div className="grid grid-cols-1  gap-4 mx-auto">
          {choosePoints.map((point, idx) => (
            <div
              key={idx}
              //   className="backdrop-blur-md bg-white/10 border border-white/10 p-4 rounded-2xl text-white shadow-md hover:bg-white/20 transition flex items-center gap-4"
              className="flex items-center gap-4"
            >
              <div className="backdrop-blur-md bg-white/10 border border-white/10 p-4 rounded-2xl text-white shadow-md hover:shadow-2xl hover:bg-white/20 transition flex items-center justify-center hover:shadow-white/50">
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
      <div className="relative max-w-4xl mx-auto">
        <img
          src="https://i.ibb.co/39GGfzjy/k-24.jpg"
          alt="Keyboard"
          className="w-full h-full object-cover rounded-xl border border-white/10 overflow-hidden"
        />
        {/* First Speech Bubble - Top Left */}
        <div className="absolute -top-4 -left-4 group animate-pulse">
          <div className="relative backdrop-blur-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/20 p-4 rounded-2xl text-white shadow-2xl hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
                50M+
              </span>
              <span className="text-lg font-medium">keystrokes per switch</span>
            </div>
            {/* Speech bubble tail */}
            {/* <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-purple-500/20"></div> */}
          </div>
        </div>
        {/* Second Speech Bubble - Top Right */}
        <div
          className="absolute -bottom-4 right-4 group animate-pulse"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="relative backdrop-blur-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/20 p-4 rounded-2xl text-white shadow-2xl hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <span className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent drop-shadow-lg">
                  10x
                </span>
                <span className="ml-2 text-lg font-medium">more durable</span>
              </div>
            </div>
            {/* Speech bubble tail */}
            {/* <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-cyan-500/20"></div> */}
          </div>
        </div>
      </div>
    </section>
  );
};
// Third Speech Bubble - Bottom Left
// <div
//   className="absolute bottom-4 left-4 group animate-pulse"
//   style={{ animationDelay: "1s" }}
// >
//   <div className="relative backdrop-blur-lg bg-gradient-to-br from-rose-500/20 to-red-500/20 border border-white/20 p-4 rounded-2xl text-white shadow-2xl hover:from-rose-500/30 hover:to-red-500/30 transition-all duration-300 transform hover:scale-105">
//     <div className="flex items-center gap-3">
//       <span className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent drop-shadow-lg">
//         Gaming
//       </span>
//       <span className="text-lg font-medium">grade switches</span>
//     </div>
//     {/* Speech bubble tail pointing up */}
//     <div className="absolute -top-2 left-8 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-rose-500/20"></div>
//   </div>
// </div>
// Fourth Speech Bubble - Bottom Right
// <div
//   className="absolute bottom-4 right-4 group animate-pulse"
//   style={{ animationDelay: "1.5s" }}
// >
//   <div className="relative backdrop-blur-lg bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-white/20 p-4 rounded-2xl text-white shadow-2xl hover:from-violet-500/30 hover:to-indigo-500/30 transition-all duration-300 transform hover:scale-105">
//     <div className="flex items-center gap-3">
//       <span className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg">
//         RGB
//       </span>
//       <span className="text-lg font-medium">backlit keys</span>
//     </div>
//     {/* Speech bubble tail pointing up */}
//     <div className="absolute -top-2 right-8 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-violet-500/20"></div>
//   </div>
// </div>

export default WhyChooseMechanical;
