import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const options = [
  {
    id: 1,
    title: "Switch Type",
    desc: "Choose between linear, tactile, or clicky switches.",
    img: "https://i.ibb.co/V1D2hfG/k-01.jpg",
    colSpan: 2,
    rowSpan: 1,
  },
  {
    id: 2,
    title: "RGB Lighting",
    desc: "Customize key lighting patterns and brightness.",
    img: "https://i.ibb.co/WW03jfSK/k-02.jpg",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    id: 3,
    title: "Layout Size",
    desc: "Pick full-size, TKL, 75%, or 60% layout.",
    img: "https://i.ibb.co/gGVdBny/k-03.jpg",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: 4,
    title: "Keycap Profiles",
    desc: "Customize key feel and height with various profiles.",
    img: "https://i.ibb.co/SDw7Mg95/k-04.jpg",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    id: 5,
    title: "Macro Support",
    desc: "Assign complex macros for gaming or productivity.",
    img: "https://i.ibb.co/hRHP5qrC/k-05.jpg",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: 6,
    title: "Wireless Mode",
    desc: "Switch between wired, Bluetooth, or 2.4GHz.",
    img: "https://i.ibb.co/Q7mtKNdS/k-06.jpg",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: 7,
    title: "Hot-Swappable",
    desc: "Change switches without soldering.",
    img: "https://i.ibb.co/352vw1XY/k-07.jpg",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: 8,
    title: "Case Material",
    desc: "Choose between aluminum, plastic, or acrylic build.",
    img: "https://i.ibb.co/fdrMVY5N/k-08.jpg",
    colSpan: 2,
    rowSpan: 1,
  },
];

const CustomizableOptions: React.FC = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        }
      );
    });
  }, []);

  return (
    <div className="">
      <h2 className="text-4xl font-bold text-white mb-10 text-center">
        Customizable Options
      </h2>

      {/* <div className="grid grid-cols-4 auto-rows-[256px] gap-4">
          <div className="bg-white col-span-2">a</div>
          <div className="bg-white row-span-2">a</div>
          <div className="bg-white">a</div>
          <div className="bg-white row-span-2">a</div>
          <div className="bg-white">a</div>
          <div className="bg-white">a</div>
          <div className="bg-white">a</div>
          <div className="bg-white col-span-2">a</div>
        </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
        {options.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className={`relative rounded-2xl overflow-hidden group col-span-${item.colSpan} row-span-${item.rowSpan} shadow-lg`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 scale-100 group-hover:scale-150"
              style={{ backgroundImage: `url(${item.img})` }}
            ></div>
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all backdrop-blur-[2px] p-4 flex flex-col justify-end">
              <h3 className="text-white text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomizableOptions;
