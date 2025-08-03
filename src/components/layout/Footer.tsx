import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom"; // Or use <a> if you're not using React Router

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" },
  { label: "Dashboard", path: "/dashboard" },
];

const Footer: React.FC = () => {
  return (
    <footer className="max-w-7xl mx-4 md:mx-8 lg:mx-auto pb-6">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 backdrop-blur-md bg-white/5 rounded-2xl p-8 border border-white/10 shadow-md">
        {/* Logo + Description */}
        <div>
          <h2 className="text-2xl font-bold mb-2 text-white">MechaKeys</h2>
          <p className="text-gray-300 mb-4">
            Explore premium mechanical keyboards and accessories tailored for
            gamers, coders, and creators across Bangladesh.
          </p>
          <div className="flex space-x-4 mt-4 text-white">
            <a href="#" target="_blank" rel="noreferrer">
              <Facebook className="w-5 h-5 hover:text-blue-400 transition" />
            </a>
            <a
              href="https://www.linkedin.com/in/sm0bin"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="w-5 h-5 hover:text-blue-400 transition" />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <Twitter className="w-5 h-5 hover:text-sky-400 transition" />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <Instagram className="w-5 h-5 hover:text-pink-400 transition" />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-gray-300 hover:text-white transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> support@mechakeys.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +880 1234-567890
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} MechaKeys. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
