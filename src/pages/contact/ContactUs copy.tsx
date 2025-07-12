// ContactUs.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";

const ContactUs = () => {
  const headingRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: "power3.out" }
    );
  }, []);

  return (
    <section className="min-h-screen py-20 px-6 md:px-16 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-500"
        >
          Contact Us
        </h2>
        <p className="text-white/70 mb-10 max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question about
          products, orders, custom keyboards, or anything else — our team is
          ready to help.
        </p>
        <form
          ref={formRef}
          className="grid gap-6 text-left bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-xl"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="bg-transparent border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="bg-transparent border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="bg-transparent border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            rows={5}
            placeholder="Your Message"
            className="bg-transparent border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
          <Button type="submit" className="w-full text-lg">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
