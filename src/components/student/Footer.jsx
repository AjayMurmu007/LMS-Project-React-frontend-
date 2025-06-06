import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 md:px-36 text-left w-full mt-10">
      <div className="flex flex-col md:flex-row items-start justify-center text-white py-10 px-8 md:px-0 gap-10 md:gap-32 border-b border-white/30">
        <div className="flex flex-col items-start md:items-start w-full">
          <img src={assets.logo_dark} alt="logo" className="" />
          <p className="mt-6 text-center md:text-left text-sm text-white/80">
            EduHub is a leading online learning platform that offers a wide
            range of courses to help you achieve your educational and
            professional goals. Whether you're looking to learn new skills,
            advance your career, or explore new interests, EduHub has something
            for everyone.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-start w-full">
          <h2 className="text-white font-semibold mb-5">Company</h2>
          <ul className="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About us</a>
            </li>

            <li>
              <a href="#">Contact us</a>
            </li>

            <li>
              <a href="#">Privacy policy</a>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex flex-col items-start w-full">
          <h2 className="font-semibold text-white mb-5">Subscribe to our newsletter</h2>
        
        <p className="text-sm text-white/80 ">
          The latest news, articles, and resources, sent to your inbox weekly.
        </p>
        <div className="flex items-center gap-2 pt-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm" />
            <button className="bg-blue-600 w-24 h-9 text-white rounded">
              Subscribe
            </button>
            </div>
        </div>
      </div>
      <p className="text-white/80 text-sm text-center md:text-left py-6 px-8 md:px-0">
        &copy; {new Date().getFullYear()} EduHub. All rights reserved. | Made
        with ❤️ by{" "}
        <a href="" target="_blank" rel="noopener noreferrer">
          Ajay
        </a>
      </p>
    </footer>
  );
};

export default Footer;
