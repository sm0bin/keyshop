import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const keyboardBrands = [
  {
    name: "A4Tech",
    icon: "/brands/a4tech.svg",
  },
  {
    name: "ASUS ROG",
    icon: "/brands/asus-rog.svg",
  },
  {
    name: "Corsair",
    icon: "/brands/corsair.svg",
  },
  {
    name: "HP",
    icon: "/brands/hp.svg",
  },
  {
    name: "Logitech",
    icon: "/brands/logitech.svg",
  },
  {
    name: "Razer",
    icon: "/brands/razer.svg",
  },
  {
    name: "Redragon",
    icon: "/brands/redragon.svg",
  },
  {
    name: "SteelSeries",
    icon: "/brands/steelseries.svg",
  },
];

const KeyboardBrands = () => {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Top Keyboard Brands
        </h2>
        <p className="text-gray-300 mt-2">
          Trusted and popular brands available in Bangladesh
        </p>
      </div>

      <div className="flex flex-wrap gap-6 max-w-6xl mx-auto">
        {/* {keyboardBrands.map((brand) => (
          <div key={brand.name} className="flex items-center gap-2">
            <img
              src={brand.icon}
              alt={brand.name}
              className="w-10 h-10 object-contain"
            />
            <span className="text-white font-semibold">{brand.name}</span>
          </div>
        ))} */}

        {keyboardBrands.map((brand) => (
          <div
            key={brand.name}
            className="size-60 flex flex-col items-center justify-center backdrop-blur-md bg-white/10 border border-white/10 p-6 rounded-2xl shadow-lg hover:bg-white/20 transition"
          >
            <img
              src={brand.icon}
              alt={brand.name}
              className="w-16 h-16 object-contain mb-3"
            />
            <h4 className="text-white text-lg">{brand.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyboardBrands;
