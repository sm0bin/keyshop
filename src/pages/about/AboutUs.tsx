import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Users,
  Award,
  Heart,
  Zap,
  Shield,
  Sparkles,
  Clock,
  Globe,
  Coffee,
} from "lucide-react";

const AboutUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate heading with scale and rotation
    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 80, scale: 0.8, rotationX: -15 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.5,
        ease: "power3.out",
      }
    );

    // Animate main text
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
      "-=0.8"
    );

    // Animate stats with stagger
    if (statsRef.current) {
      tl.fromTo(
        Array.from(statsRef.current.children),
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.1,
        },
        "-=0.5"
      );
    }

    // Animate values cards
    if (valuesRef.current) {
      tl.fromTo(
        Array.from(valuesRef.current.children),
        { opacity: 0, x: -50, rotationY: -15 },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
        },
        "-=0.3"
      );
    }

    // Animate timeline
    if (timelineRef.current) {
      tl.fromTo(
        Array.from(timelineRef.current.children),
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
        },
        "-=0.5"
      );
    }

    // Animate team cards
    if (teamRef.current) {
      tl.fromTo(
        Array.from(teamRef.current.children),
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.3"
      );
    }

    // Animate footer
    tl.fromTo(
      footerRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
      "-=0.2"
    );

    // Add continuous animations
    gsap.to(".floating-element", {
      y: -10,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.2,
    });

    // Add hover animations
    const cards = document.querySelectorAll(".hover-card");
    cards.forEach((card) => {
      const element = card as HTMLElement;
      element.addEventListener("mouseenter", () => {
        gsap.to(element, {
          y: -8,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      element.addEventListener("mouseleave", () => {
        gsap.to(element, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
      });
    });

    // Add button hover effects
    const buttons = document.querySelectorAll(".gradient-btn");
    buttons.forEach((button) => {
      const element = button as HTMLElement;
      element.addEventListener("mouseenter", () => {
        gsap.to(element, { scale: 1.05, duration: 0.2, ease: "power2.out" });
      });
      element.addEventListener("mouseleave", () => {
        gsap.to(element, { scale: 1, duration: 0.2, ease: "power2.out" });
      });
    });
  }, []);

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passion",
      description:
        "We live and breathe mechanical keyboards, bringing genuine enthusiasm to every product we create.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality",
      description:
        "Every keyboard undergoes rigorous testing to ensure it meets our high standards for durability and performance.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description:
        "We foster a thriving community of keyboard enthusiasts who share knowledge, tips, and experiences.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation",
      description:
        "We continuously push boundaries with cutting-edge technology and creative design solutions.",
    },
  ];

  const stats = [
    {
      number: "50K+",
      label: "Happy Customers",
      icon: <Users className="w-6 h-6" />,
    },
    { number: "200+", label: "Products", icon: <Award className="w-6 h-6" /> },
    {
      number: "5",
      label: "Years Experience",
      icon: <Clock className="w-6 h-6" />,
    },
    { number: "24/7", label: "Support", icon: <Globe className="w-6 h-6" /> },
  ];

  const timeline = [
    {
      year: "2019",
      title: "Founded",
      description: "Started as a passion project in a small garage",
    },
    {
      year: "2020",
      title: "First Product",
      description: "Launched our flagship mechanical keyboard series",
    },
    {
      year: "2021",
      title: "Community",
      description: "Built a community of 10,000+ keyboard enthusiasts",
    },
    {
      year: "2022",
      title: "Expansion",
      description: "Expanded to custom keyboard solutions and accessories",
    },
    {
      year: "2023",
      title: "Innovation",
      description: "Introduced wireless and RGB customization features",
    },
    {
      year: "2024",
      title: "Growth",
      description: "Reached 50,000+ satisfied customers across Bangladesh",
    },
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      description: "Mechanical keyboard enthusiast with 10+ years in tech",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      name: "Alex Rodriguez",
      role: "Lead Designer",
      description: "Award-winning designer specializing in ergonomic solutions",
      gradient: "from-cyan-400 to-blue-500",
    },
    {
      name: "Mike Johnson",
      role: "Engineering Lead",
      description: "Hardware expert with expertise in switch technology",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      name: "Lisa Wang",
      role: "Community Manager",
      description: "Building bridges between enthusiasts and innovation",
      gradient: "from-orange-400 to-red-500",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 px-6 md:px-16 bg-gradient-to-br from-black via-gray-900 to-neutral-900 text-white overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="floating-element absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
        <div className="floating-element absolute top-40 right-32 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl"></div>
        <div className="floating-element absolute bottom-40 left-32 w-40 h-40 bg-pink-500/20 rounded-full blur-xl"></div>
        <div className="floating-element absolute bottom-20 right-20 w-28 h-28 bg-blue-500/20 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1
            ref={headingRef}
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-8"
          >
            About MechaKeys
          </h1>
          <div ref={textRef} className="space-y-6">
            <p className="text-white/80 text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto">
              At{" "}
              <span className=" font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                MechaKeys
              </span>
              , we are passionate about crafting the ultimate typing and gaming
              experience. We specialize in high-quality mechanical keyboards
              that merge performance, durability, and aesthetics.
            </p>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              From tactile satisfaction to RGB customization, our keyboards are
              designed to ignite productivity and elevate gameplay. With a
              growing community of enthusiasts and a dedicated support team, we
              ensure every keystroke counts. We're not just building
              keyboards—we're building experiences.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button className="gradient-btn bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                Explore Our Products
              </button>
              <button className="gradient-btn bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                Join Our Community
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="hover-card bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-500">
            Our Values
          </h2>
          <div
            ref={valuesRef}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <div
                key={index}
                className="hover-card bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-white/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            Our Journey
          </h2>
          <div ref={timelineRef} className="space-y-6">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="hover-card flex items-center gap-6 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">{item.year}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-cyan-500">
            Meet Our Team
          </h2>
          <div
            ref={teamRef}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {team.map((member, index) => (
              <div
                key={index}
                className="hover-card bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${member.gradient} rounded-full mx-auto mb-4 flex items-center justify-center`}
                >
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-cyan-400 font-medium mb-3">{member.role}</p>
                <p className="text-white/70 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-20">
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="text-white/70 mb-6">
              Join thousands of satisfied customers who have elevated their
              typing experience with MechaKeys.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="gradient-btn bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Shop Now
              </button>
              <button className="gradient-btn bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                <Coffee className="w-5 h-5" />
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={footerRef}
        className="absolute bottom-10 right-10 text-right text-white/30 text-sm"
      >
        <div className="flex items-center gap-2">
          <span>Crafted with</span>
          <Heart className="w-4 h-4 text-red-400" />
          <span>by keyboard lovers.</span>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
