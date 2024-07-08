import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiTwitter, FiFacebook, FiInstagram } from 'react-icons/fi'; 

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-10 px-4 text-gray-800" data-aos="zoom-in-up">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pb-10 wrapper w-full gap-16 md:gap-10 lg:gap-5 xl:gap-10 2xl:px-10">
        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-semibold">Company</h2>
          <Link to="/home" className="text-sm text-gray-700 hover:text-blue-500 hover:underline">Home</Link>
          <Link to="/about" className="text-sm text-gray-700 hover:text-blue-500 hover:underline">About Us</Link>
          <Link to="/products" className="text-sm text-gray-700 hover:text-blue-500 hover:underline">Products</Link>
          <Link to="/contact" className="text-sm text-gray-700 hover:text-blue-500 hover:underline">Contact</Link>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Follow Us</h2>
          <div className="flex space-x-4">
            <FiTwitter className="text-gray-400 hover:text-blue-500" />
            <FiFacebook className="text-gray-400 hover:text-blue-500" />
            <FiInstagram className="text-gray-400 hover:text-blue-500" />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Customer Support</h2>
          <p className="text-sm text-gray-700 hover:text-blue-500 hover:underline">Delivery & Returns</p>
          <p className="text-sm text-gray-700 hover:text-blue-500 hover:underline">Payment Options</p>
          <p className="text-sm text-gray-700 hover:text-blue-500 hover:underline">FAQs</p>
          <p className="text-sm text-gray-700 hover:text-blue-500 hover:underline">My Account</p>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Contact Us</h2>
          <div className="flex items-center space-x-2">
            <FiMapPin className="text-gray-400" />
            <span className="text-sm text-gray-700">Bilha Towers Ground Floor, Shop Number 45KE</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiPhone className="text-gray-400" />
            <span className="text-sm text-gray-700">+254712345678</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiMail className="text-gray-400" />
            <span className="text-sm text-gray-700">medimart@gmail.com</span>
          </div>
        </div>
        
      </div>
      <hr className="my-6 border-gray-300" />
      <p className="text-center text-sm text-gray-600">&copy; {new Date().getFullYear()} MediMart. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
