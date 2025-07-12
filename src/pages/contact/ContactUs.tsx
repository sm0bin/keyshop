import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Clock,
  Send,
} from "lucide-react";

const ContactUs = () => {
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const contactInfoRef = useRef(null);
  const socialRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate heading
    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: -50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
    );

    // Animate form
    tl.fromTo(
      formRef.current,
      { opacity: 0, y: 50, rotationX: -15 },
      { opacity: 1, y: 0, rotationX: 0, duration: 1, ease: "power3.out" },
      "-=0.5"
    );

    // Animate contact info cards
    tl.fromTo(
      contactInfoRef.current?.children || [],
      { opacity: 0, x: -30, scale: 0.9 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      },
      "-=0.7"
    );

    // Animate social media icons
    tl.fromTo(
      socialRef.current?.children || [],
      { opacity: 0, y: 20, rotation: -180 },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.1,
      },
      "-=0.5"
    );

    // Animate map section
    tl.fromTo(
      mapRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
      "-=0.3"
    );

    // Add hover animations for form inputs
    const inputs = document.querySelectorAll(".contact-input");
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        gsap.to(input, { scale: 1.02, duration: 0.2, ease: "power2.out" });
      });
      input.addEventListener("blur", () => {
        gsap.to(input, { scale: 1, duration: 0.2, ease: "power2.out" });
      });
    });

    // Add hover animations for contact cards
    const cards = document.querySelectorAll(".contact-card");
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -5,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
      });
    });

    // Add hover animations for social icons
    const socialIcons = document.querySelectorAll(".social-icon");
    socialIcons.forEach((icon) => {
      icon.addEventListener("mouseenter", () => {
        gsap.to(icon, {
          scale: 1.2,
          rotation: 360,
          duration: 0.4,
          ease: "power2.out",
        });
      });
      icon.addEventListener("mouseleave", () => {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add submit animation
    gsap.to(".submit-btn", {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <section className="min-h-screen py-20 px-6 md:px-16 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500"
          >
            Get In Touch
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have a question about
            products, orders, custom keyboards, or anything else — our team is
            ready to help.
          </p>
        </div>

        <div>
          {/* Contact Cards */}
          <div ref={contactInfoRef} className="grid grid-cols-2 gap-6 my-6">
            <div className="contact-card bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">Email Us</h4>
                  <p className="text-white/70">We'll respond within 24 hours</p>
                </div>
              </div>
              <p className="text-cyan-400 font-medium">support@mechakeys.com</p>
              <p className="text-white/60">info@mechakeys.com</p>
            </div>

            <div className="contact-card bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">Call Us</h4>
                  <p className="text-white/70">Mon-Fri from 9am to 6pm</p>
                </div>
              </div>
              <p className="text-cyan-400 font-medium">+880 1234-567890</p>
              <p className="text-white/60">+880 1987-654321</p>
            </div>

            <div className="contact-card bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">Visit Us</h4>
                  <p className="text-white/70">Come say hello at our office</p>
                </div>
              </div>
              <p className="text-cyan-400 font-medium">
                123 Tech Street, Dhanmondi
              </p>
              <p className="text-white/60">Dhaka 1205, Bangladesh</p>
            </div>

            <div className="contact-card bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">
                    Business Hours
                  </h4>
                  <p className="text-white/70">When we're available</p>
                </div>
              </div>
              <p className="text-cyan-400 font-medium">
                Mon - Fri: 9:00 AM - 6:00 PM
              </p>
              <p className="text-white/60">Sat: 10:00 AM - 4:00 PM</p>
              <p className="text-white/60">Sun: Closed</p>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Contact Form */}
          <div ref={formRef}>
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-500">
                Send us a Message
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="contact-input bg-transparent border border-white/20 rounded-lg px-4 py-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="contact-input bg-transparent border border-white/20 rounded-lg px-4 py-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                  required
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                className="contact-input w-full bg-transparent border border-white/20 rounded-lg px-4 py-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 mb-6"
                required
              />

              <textarea
                rows={5}
                placeholder="Your Message"
                className="contact-input w-full bg-transparent border border-white/20 rounded-lg px-4 py-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 mb-6 resize-none"
                required
              ></textarea>

              <button
                type="submit"
                className="submit-btn w-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Social Media */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
              <h4 className="text-xl font-semibold text-white mb-4">
                Follow Us
              </h4>
              <div ref={socialRef} className="flex gap-4">
                <a
                  href="#"
                  className="social-icon w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:from-blue-500 hover:to-blue-600 transition-all duration-300"
                >
                  <Facebook className="w-6 h-6 text-white" />
                </a>
                <a
                  href="#"
                  className="social-icon w-12 h-12 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full flex items-center justify-center hover:from-sky-400 hover:to-sky-500 transition-all duration-300"
                >
                  <Twitter className="w-6 h-6 text-white" />
                </a>
                <a
                  href="#"
                  className="social-icon w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center hover:from-pink-400 hover:to-pink-500 transition-all duration-300"
                >
                  <Instagram className="w-6 h-6 text-white" />
                </a>
                <a
                  href="https://www.linkedin.com/in/sm0bin"
                  className="social-icon w-12 h-12 bg-gradient-to-r from-blue-700 to-blue-800 rounded-full flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                >
                  <Linkedin className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div
              ref={mapRef}
              className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl"
            >
              <h4 className="text-xl font-semibold text-white mb-4">Find Us</h4>
              <div className="w-full h-48 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-white/60 mx-auto mb-2" />
                  <p className="text-white/60">Interactive Map</p>
                  <p className="text-white/40 text-sm">
                    Click to view directions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
