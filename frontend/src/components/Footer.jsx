import React from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#6A38C2] to-purple-700  text-white py-6 px-4 md:px-10 flex flex-col md:flex-row items-center justify-between">
      {/* Social media icons */}
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
          <Facebook size={20} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">
          <Twitter size={20} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
          <Linkedin size={20} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
          <Instagram size={20} />
        </a>
      </div>

      {/* Website name on right */}
      <div className="text-sm text-gray-300">
        © {new Date().getFullYear()} <span className="font- text-xl text-white">JobFinder Pro</span>. All rights reserved. @044
      </div>
    </footer>
  );
};

export default Footer;
