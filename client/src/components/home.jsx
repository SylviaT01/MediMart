import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import Video from './assets/Video1.mp4';
import Video1 from './assets/inject.mp4';
import Video2 from './assets/Pharm2.mp4';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="bg-gray-100">
      {/* Hero section */}
      <div className="relative text-white">

        {/* Video container */}
        <div className="w-full max-w-full overflow-hidden relative">
        <Slider {...settings}>
          <div className="relative">
            <video className="w-full h-svh object-cover" autoPlay loop muted playsInline >
              <source src={Video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
              <h2 className="text-4xl md:text-6xl lg:text-7xl  font-semibold uppercase space-font z-10 text-white">Welcome to Our Online Pharmacy</h2>
              <p className="w-2/3 lg:w-1/2 z-20 text-sm md:text-base lg:text-lg xl:text-xl">Find the best products for your health needs.</p>
              <Link to="/products" className="bg-blue-300 hover:bg-blue-200 text-white py-2 px-4 mt-4 rounded-md transition duration-300 ease-in-out">Shop Now</Link>
            </div>
          </div>
          <div className="relative">
            <video className="w-full h-svh object-cover" autoPlay loop muted playsInline >
              <source src={Video1} type="video/mp4" />
            </video>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
              <h2 className="text-4xl md:text-6xl lg:text-7xl  font-semibold uppercase space-font z-10 text-white">Welcome to Our Online Pharmacy</h2>
              <p className="w-2/3 lg:w-1/2 z-20 text-sm md:text-base lg:text-lg xl:text-xl">Find the best products for your health needs.</p>
              <button className="bg-blue-300 hover:bg-blue-200 text-white py-2 px-4 mt-4 rounded-md transition duration-300 ease-in-out">Shop Now</button>
            </div>
          </div>
          <div className="relative">
            <video className="w-full h-svh object-cover" autoPlay loop muted playsInline >
              <source src={Video2} type="video/mp4" />
            </video>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
              <h2 className="text-4xl md:text-6xl lg:text-7xl  font-semibold uppercase space-font z-10 text-white">Welcome to Our Online Pharmacy</h2>
              <p className="w-2/3 lg:w-1/2 z-20 text-sm md:text-base lg:text-lg xl:text-xl">Find the best products for your health needs.</p>
              <button className="bg-blue-300 hover:bg-blue-200 text-white py-2 px-4 mt-4 rounded-md transition duration-300 ease-in-out">Shop Now</button>
            </div>
          </div>
        </Slider>
        </div>
      </div>

      {/* Features section */}
      <section className="py-20">
        <div className="container mx-auto px-4 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-20">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">Quality Products</h2>
              <p className="text-gray-700">Browse our wide selection of high-quality products.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">Fast Delivery</h2>
              <p className="text-gray-700">Get your orders delivered quickly and securely.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">Customer Support</h2>
              <p className="text-gray-700">24/7 customer support available for your assistance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="bg-gray-200 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg text-gray-700 mb-6">Have questions or need assistance? Contact us now!</p>
          <button className="bg-blue-300 hover:bg-blue-200 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out">Contact Us</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
