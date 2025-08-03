import Footer from "@/components/layout/Footer";
import Hero from "./components/Hero";
import KeyboardBrands from "./components/KeyboardBrands";
import ShopFeatures from "./components/ShopFeatures";
import Testimonials from "./components/Testimonials";
import WhyChooseMechanical from "./components/WhyChooseMechanical";
import CustomizableOptions from "./components/CustomizableOptions";
import FeaturedProducts from "./components/FeaturedProducts";

const Home = () => {
  return (
    <div className="pt-16">
      <Hero />

      <div className="space-y-28 my-28 max-w-7xl mx-4 md:mx-8 lg:mx-auto">
        <ShopFeatures />
        <FeaturedProducts />
        <KeyboardBrands />
        <Testimonials />
        <WhyChooseMechanical />
        <CustomizableOptions />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
