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
      <div className="relative text-white h-400px">

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
              <Link to="/about" className="bg-blue-300 hover:bg-blue-200 text-white py-2 px-4 mt-4 rounded-md transition duration-300 ease-in-out">Get to know us</Link>
            </div>
          </div>
          <div className="relative">
            <video className="w-full h-svh object-cover" autoPlay loop muted playsInline >
              <source src={Video2} type="video/mp4" />
            </video>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
              <h2 className="text-4xl md:text-6xl lg:text-7xl  font-semibold uppercase space-font z-10 text-white">Welcome to Our Online Pharmacy</h2>
              <p className="w-2/3 lg:w-1/2 z-20 text-sm md:text-base lg:text-lg xl:text-xl">Find the best products for your health needs.</p>
              <Link to="/contact" className="bg-blue-300 hover:bg-blue-200 text-white py-2 px-4 mt-4 rounded-md transition duration-300 ease-in-out">Reach out</Link>
            </div>
          </div>
        </Slider>
        </div>
      </div>

      {/* Features section */}
      <section className="py-20">
        <div className="container mx-auto px-4 ">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-60">
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105">
              <img src="https://img.freepik.com/free-photo/top-view-pills-blue-background_23-2149341563.jpg?t=st=1720207510~exp=1720211110~hmac=197e817ff7f653b8ae4c998e66611e86c40f4b38cd9494df5a8577cb263b7932&w=740" alt="Quality Products" className="w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-6 text-white" data-aos="flip-left">
                <h2 className="text-xl font-bold mb-2">Quality Products</h2>
                <p className="text-gray-200">Browse our wide selection of high-quality products.</p>
              </div>
            </div>
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105">
              <img src="https://img.freepik.com/free-photo/african-american-courier-going-though-check-list-while-carrying-packages-walking-down-street_637285-1224.jpg?t=st=1720208256~exp=1720211856~hmac=b988863e32b61e1fe245e1904ec0094a7ba66d757c12d7bd40c300ca8af8c849&w=740" alt="Lady making a delivery" className="w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-6 text-white" data-aos="flip-left">
                <h2 className="text-xl font-bold mb-2">Fast Delivery</h2>
                <p className="text-gray-200">Enjoy fast and reliable delivery service to your doorstep.</p>
              </div>
            </div>
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105">
              <img src="https://img.freepik.com/free-photo/two-african-american-pharmacist-working-drugstore-hospital-pharmacy-african-healthcare_627829-3327.jpg?t=st=1720208457~exp=1720212057~hmac=aaa7bd2ae583fb084a2f1e0c8a6dbf75793dbd8001ddea8e511de52e7e312a18&w=740" alt="Customer care" className="w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-6 text-white" data-aos="flip-left">
                <h2 className="text-xl font-bold mb-2">Customer Support</h2>
                <p className="text-gray-200">Our support team is here to help you with any questions or concerns.</p>
              </div>
            </div>
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105">
              <img src="https://img.freepik.com/free-photo/happy-client-with-their-box-delivered_23-2149229256.jpg?t=st=1720381436~exp=1720385036~hmac=f0934a416def2c93daab920bf0c8751ed7f406a1157232d12279e950cc2fea73&w=740" alt="Lady making an order online" className="w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-6 text-white" data-aos="flip-left">
                <h2 className="text-xl font-bold mb-2">Easy Online Ordering</h2>
                <p className="text-gray-200">Experience hassle-free online ordering from the comfort of your home.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact section */}
      
    </div>
  );
};

export default Home;
