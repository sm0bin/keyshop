import Footer from "@/components/layout/Footer";
import Hero from "./components/Hero";
import KeyboardBrands from "./components/KeyboardBrands";
import ShopFeatures from "./components/ShopFeatures";
import Testimonials from "./components/Testimonials";
import WhyChooseMechanical from "./components/WhyChooseMechanical";
import CustomizableOptions from "./components/CustomizableOptions";

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
      <WhyChooseMechanical />
      <CustomizableOptions />
      <Footer />
    </div>
  );
};

export default Home;
