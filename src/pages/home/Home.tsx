import Hero from "./components/Hero";
import KeyboardBrands from "./components/KeyboardBrands";
import ShopFeatures from "./components/ShopFeatures";
import Testimonials from "./components/Testimonials";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-16">
      <Hero />
      <ShopFeatures />
      <KeyboardBrands />
      <div className="w-full bg-slate-300 h-40 flex justify-center items-center rounded-md text-2xl font-bold">
        <h1>Featured Brands</h1>
      </div>
      <Testimonials />
      <div className="w-full bg-slate-300 h-40 flex justify-center items-center rounded-md text-2xl font-bold">
        <h1>Why choose mechanical keyboards</h1>
      </div>
      <div className="w-full bg-slate-300 h-40 flex justify-center items-center rounded-md text-2xl font-bold">
        <h1>Customizing your keyboard</h1>
      </div>
      <div className="w-full bg-slate-300 h-40 flex justify-center items-center rounded-md text-2xl font-bold">
        <h1>Footer</h1>
      </div>
    </div>
  );
};

export default Home;
