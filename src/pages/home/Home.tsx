import Footer from "@/components/layout/Footer";
import Hero from "./components/Hero";
import KeyboardBrands from "./components/KeyboardBrands";
import ShopFeatures from "./components/ShopFeatures";
import Testimonials from "./components/Testimonials";
import WhyChooseMechanical from "./components/WhyChooseMechanical";
import CustomizableOptions from "./components/CustomizableOptions";

const Home = () => {
  return (
    <div className="pt-16">
      <Hero />
      <ShopFeatures />
      <div className="w-full bg-slate-300 h-40 flex justify-center items-center rounded-md text-2xl font-bold">
        <h1>Featured Products</h1>
      </div>
      <KeyboardBrands />
      <Testimonials />
      <WhyChooseMechanical />
      <CustomizableOptions />
      <Footer />
    </div>
  );
};

export default Home;
