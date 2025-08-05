import Footer from "@/components/layout/Footer";
import Hero from "./components/Hero";
import KeyboardBrands from "./components/KeyboardBrands";
import ShopFeatures from "./components/ShopFeatures";
import Testimonials from "./components/Testimonials";
import WhyChooseMechanical from "./components/WhyChooseMechanical";
import CustomizableOptions from "./components/CustomizableOptions";
import FeaturedProducts from "./components/FeaturedProducts";
import { useEffect, useRef } from "react";

import gsap from "gsap"; // <-- import GSAP
import { useGSAP } from "@gsap/react"; // <-- import the hook from our React package
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const container = useRef(null);
  const sections = useRef([]);

  const addToSections = (el) => {
    if (el && !sections.current.includes(el)) {
      sections.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(sections.current, {
        opacity: 0,
        y: 50,
      });

      sections.current.forEach((section) => {
        if (section) {
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });
    }, container);

    // Cleanup function
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // useGSAP(
  //   () => {
  //     // Animate sections on scroll
  //     const sections = gsap.utils.toArray(".animate-section");

  //     gsap.set(sections.current, {
  //       opacity: 0,
  //       y: 50,
  //     });

  //     sections.forEach((section: any) => {
  //       gsap.from(".animate-section", {
  //         opacity: 0,
  //         y: 50,
  //         duration: 3,
  //         scrollTrigger: {
  //           trigger: section,
  //           start: "top bottom-=100",
  //           end: "top center",
  //           toggleActions: "play none none reverse",
  //         },
  //       });
  //     });
  //   },
  //   { scope: container }
  // );

  return (
    <div ref={container} className="pt-16">
      <Hero />

      <div className="space-y-28 my-28 max-w-7xl mx-4 md:mx-8 lg:mx-auto">
        <div className=".animate-section" ref={addToSections}>
          <ShopFeatures />
        </div>
        <div className=".animate-section" ref={addToSections}>
          <FeaturedProducts />
        </div>
        <div className=".animate-section" ref={addToSections}>
          <KeyboardBrands />
        </div>
        <div className=".animate-section" ref={addToSections}>
          <Testimonials />
        </div>
        <div className=".animate-section" ref={addToSections}>
          <WhyChooseMechanical />
        </div>
        <div className=".animate-section" ref={addToSections}>
          <CustomizableOptions />
        </div>
      </div>
      <Footer />
    </div>
  );
};

// const Home = () => {
//   const containerRef = useRef(null);
//   const sectionsRef = useRef([]);

//   useGSAP(() => {
//     const ctx = gsap.context(() => {
//       // Set initial states for all sections
//       gsap.set(sectionsRef.current, {
//         opacity: 0,
//         y: 50,
//       });

//       // Animate hero section on page load
//       gsap.fromTo(
//         ".hero-section",
//         {
//           opacity: 0,
//           y: 30,
//         },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1,
//           ease: "power2.out",
//           delay: 0.2,
//         }
//       );

//       // Create scroll-triggered animations for each section
//       sectionsRef.current.forEach((section) => {
//         if (section) {
//           gsap.to(section, {
//             opacity: 1,
//             y: 0,
//             duration: 0.8,
//             ease: "power2.out",
//             scrollTrigger: {
//               trigger: section,
//               start: "top 80%",
//               end: "bottom 20%",
//               toggleActions: "play none none reverse",
//               // Uncomment below for debugging
//               // markers: true,
//             },
//           });

//           // Add stagger animation for child elements if they exist
//           const childElements = section.querySelectorAll(
//             ".animate-child, [data-animate]"
//           );
//           if (childElements.length > 0) {
//             gsap.fromTo(
//               childElements,
//               {
//                 opacity: 0,
//                 y: 30,
//               },
//               {
//                 opacity: 1,
//                 y: 0,
//                 duration: 0.6,
//                 stagger: 0.1,
//                 ease: "power2.out",
//                 scrollTrigger: {
//                   trigger: section,
//                   start: "top 75%",
//                   toggleActions: "play none none reverse",
//                 },
//               }
//             );
//           }
//         }
//       });

//       // Parallax effect for hero background
//       gsap.to(".hero-bg", {
//         yPercent: -50,
//         ease: "none",
//         scrollTrigger: {
//           trigger: ".hero-section",
//           start: "top bottom",
//           end: "bottom top",
//           scrub: true,
//         },
//       });

//       // Footer slide up animation
//       gsap.fromTo(
//         "footer",
//         {
//           opacity: 0,
//           y: 50,
//         },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.8,
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: "footer",
//             start: "top 90%",
//             toggleActions: "play none none reverse",
//           },
//         }
//       );
//     }, containerRef);

//     // Cleanup function
//     return () => {
//       ctx.revert();
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   // Function to add refs to sections
//   const addToRefs = (el) => {
//     if (el && !sectionsRef.current.includes(el)) {
//       sectionsRef.current.push(el);
//     }
//   };

//   return (
//     <div ref={containerRef} className="pt-16">
//       <div className="hero-section">
//         <Hero />
//       </div>

//       {/* <div className="space-y-28 my-28 max-w-7xl mx-4 md:mx-8 lg:mx-auto">
//         <div ref={addToRefs} className="section-animate">
//           <ShopFeatures />
//         </div>

//         <div ref={addToRefs} className="section-animate">
//           <FeaturedProducts />
//         </div>

//         <div ref={addToRefs} className="section-animate">
//           <KeyboardBrands />
//         </div>

//         <div ref={addToRefs} className="section-animate">
//           <Testimonials />
//         </div>

//         <div ref={addToRefs} className="section-animate">
//           <WhyChooseMechanical />
//         </div>

//         <div ref={addToRefs} className="section-animate">
//           <CustomizableOptions />
//         </div>
//       </div> */}

//       <div className="space-y-28 my-28 max-w-7xl mx-4 md:mx-8 lg:mx-auto">
//         <ShopFeatures />
//         <FeaturedProducts />
//         <KeyboardBrands />
//         <Testimonials />
//         <WhyChooseMechanical />
//         <CustomizableOptions />
//       </div>

//       <Footer />
//     </div>
//   );
// };

export default Home;
