import Footer from "@/components/layout/Footer";
import Hero from "./components/Hero";
import KeyboardBrands from "./components/KeyboardBrands";
import ShopFeatures from "./components/ShopFeatures";
import Testimonials from "./components/Testimonials";
import WhyChooseMechanical from "./components/WhyChooseMechanical";
import CustomizableOptions from "./components/CustomizableOptions";
import FeaturedProducts from "./components/FeaturedProducts";
import { useRef } from "react";

import gsap from "gsap"; // <-- import GSAP
import { useGSAP } from "@gsap/react"; // <-- import the hook from our React package
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const container = useRef(null);
  // const section = useRef(null);

  useGSAP(
    () => {
      // Animate sections on scroll
      const sections = gsap.utils.toArray("section");

      sections.forEach((section: any) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 3,
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=100",
            end: "top center",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="pt-16">
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
