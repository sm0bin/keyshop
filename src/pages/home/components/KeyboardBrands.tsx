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
    name: "Logitech",
    icon: "/brands/logitech.svg",
  },
  {
    name: "SteelSeries",
    icon: "/brands/steelseries.svg",
  },
  {
    name: "Redragon",
    icon: "/brands/redragon.svg",
  },
  {
    name: "HP",
    icon: "/brands/hp.svg",
  },
  {
    name: "Razer",
    icon: "/brands/razer.svg",
  },
];

const KeyboardBrands = () => {
  return (
    <section className="">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Top Keyboard Brands
        </h2>
        <p className="text-gray-300 mt-2">
          Trusted and popular brands available in Bangladesh
        </p>
      </div>

      {/* <div className="flex flex-wrap gap-6 max-w-6xl mx-auto"> */}
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
      <Carousel className="max-w-6xl mx-auto">
        <CarouselContent>
          {keyboardBrands.map((brand) => (
            <CarouselItem
              key={brand.name}
              className="md:basis-1/3 lg:basis-1/4"
            >
              <div
                key={brand.name}
                className="size-64 flex flex-col items-center justify-center backdrop-blur-md bg-white/40 border border-white/10 p-6 rounded-2xl shadow-lg hover:bg-white/60 transition cursor-grab select-none"
              >
                <img
                  src={brand.icon}
                  alt={brand.name}
                  className="size-40 object-contain mb-3 grayscale "
                />
                <h4 className="text-white text-lg">{brand.name}</h4>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="right-20 z-40" />
        <CarouselNext />
      </Carousel>
      {/* </div> */}
    </section>
  );
};

export default KeyboardBrands;
