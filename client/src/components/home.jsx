import React, { useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Video from "./assets/Video1.mp4";
import Video1 from "./assets/inject.mp4";
import Video2 from "./assets/Pharm2.mp4";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadset,
  faUserMd,
  faSoap,
  faCapsules,
  faPills,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import "aos/dist/aos.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const features = [
    {
      icon: faPills,
      title: "Prescription Medications",
      animation: "flip-left",
    },
    {
      icon: faCapsules,
      title: "Over-the-Counter Medications",
      animation: "flip-right",
    },
    { icon: faSoap, title: "Personal Care Products", animation: "flip-left" },
    { icon: faUserMd, title: "Consultation Services", animation: "flip-right" },
    { icon: faHeadset, title: "Customer Support", animation: "flip-left" },
    { icon: faTruck, title: "Home Delivery", animation: "flip-right" },
  ];

  return (
    <div className="bg-gray-100">
      {/* Hero section */}
      <div className="relative text-white">
        {/* Video container */}
        <div className="w-full max-w-full overflow-hidden relative">
          <Slider {...settings}>
            <div className="relative">
              <video
                className="w-full h-svh object-cover "
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={Video} type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
                <h2 className="text-4xl md:text-6xl lg:text-7xl  font-semibold uppercase space-font z-10 text-white">
                  Welcome to Our Online Pharmacy
                </h2>
                <p className="w-2/3 lg:w-1/2 z-20 text-sm md:text-base lg:text-lg xl:text-xl">
                  Find the best products for your health needs.
                </p>
                <Link
                  to="/products"
                  className="bg-blue-300 hover:bg-blue-200 text-white py-2 px-4 mt-4 rounded-md transition duration-300 ease-in-out"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="relative">
              <video
                className="w-full  object-cover h-svh"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={Video1} type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
                <h2 className="text-4xl md:text-6xl lg:text-7xl  font-semibold uppercase space-font z-10 text-white">
                  Welcome to Our Online Pharmacy
                </h2>
                <p className="w-2/3 lg:w-1/2 z-20 text-sm md:text-base lg:text-lg xl:text-xl">
                  Find the best products for your health needs.
                </p>
                <Link
                  to="/about"
                  className="bg-blue-300 hover:bg-blue-200 text-white py-2 px-4 mt-4 rounded-md transition duration-300 ease-in-out"
                >
                  Get to know us
                </Link>
              </div>
            </div>
            <div className="relative">
              <video
                className="w-full object-cover h-svh"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={Video2} type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
                <h2 className="text-4xl md:text-6xl lg:text-7xl  font-semibold uppercase space-font z-10 text-white">
                  Welcome to Our Online Pharmacy
                </h2>
                <p className="w-2/3 lg:w-1/2 z-20 text-sm md:text-base lg:text-lg xl:text-xl">
                  Find the best products for your health needs.
                </p>
                <Link
                  to="/contact"
                  className="bg-blue-300 hover:bg-blue-200 text-white py-2 px-4 mt-4 rounded-md transition duration-300 ease-in-out"
                >
                  Reach out
                </Link>
              </div>
            </div>
          </Slider>
        </div>
      </div>

      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex flex-col items-center text-center transform transition duration-300 ease-in-out hover:scale-105 ${feature.animation}`}
              >
                <div className="w-24 h-24 flex items-center justify-center bg-slate-100 rounded-full mb-4 border border-blue-200">
                  <FontAwesomeIcon
                    icon={feature.icon}
                    className="text-blue-400 text-4xl"
                  />
                </div>
                <p className="text-center text-gray-800 text-sm font-semibold">
                  {feature.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features section */}
      <section className="py-20">
        <div className="container mx-auto px-4 ">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-60">
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105">
              <img
                src="https://img.freepik.com/free-photo/top-view-pills-blue-background_23-2149341563.jpg?t=st=1720207510~exp=1720211110~hmac=197e817ff7f653b8ae4c998e66611e86c40f4b38cd9494df5a8577cb263b7932&w=740"
                alt="Quality Products"
                className="w-full h-full object-cover opacity-70"
              />
              <div
                className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-6 text-white"
                data-aos="flip-left"
              >
                <h2 className="text-xl font-bold mb-2">Quality Products</h2>
                <p className="text-gray-200">
                  Browse our wide selection of high-quality products.
                </p>
              </div>
            </div>
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105">
              <img
                src="https://img.freepik.com/free-photo/african-american-courier-going-though-check-list-while-carrying-packages-walking-down-street_637285-1224.jpg?t=st=1720208256~exp=1720211856~hmac=b988863e32b61e1fe245e1904ec0094a7ba66d757c12d7bd40c300ca8af8c849&w=740"
                alt="Lady making a delivery"
                className="w-full h-full object-cover opacity-70"
              />
              <div
                className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-6 text-white"
                data-aos="flip-left"
              >
                <h2 className="text-xl font-bold mb-2">Fast Delivery</h2>
                <p className="text-gray-200">
                  Enjoy fast and reliable delivery service to your doorstep.
                </p>
              </div>
            </div>
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105">
              <img
                src="https://img.freepik.com/free-photo/two-african-american-pharmacist-working-drugstore-hospital-pharmacy-african-healthcare_627829-3327.jpg?t=st=1720208457~exp=1720212057~hmac=aaa7bd2ae583fb084a2f1e0c8a6dbf75793dbd8001ddea8e511de52e7e312a18&w=740"
                alt="Customer care"
                className="w-full h-full object-cover opacity-70"
              />
              <div
                className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-6 text-white"
                data-aos="flip-left"
              >
                <h2 className="text-xl font-bold mb-2">Customer Support</h2>
                <p className="text-gray-200">
                  Our support team is here to help you with any questions or
                  concerns.
                </p>
              </div>
            </div>
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105">
              <img
                src="https://img.freepik.com/free-photo/happy-client-with-their-box-delivered_23-2149229256.jpg?t=st=1720381436~exp=1720385036~hmac=f0934a416def2c93daab920bf0c8751ed7f406a1157232d12279e950cc2fea73&w=740"
                alt="Lady making an order online"
                className="w-full h-full object-cover opacity-70"
              />
              <div
                className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-6 text-white"
                data-aos="flip-left"
              >
                <h2 className="text-xl font-bold mb-2">Easy Online Ordering</h2>
                <p className="text-gray-200">
                  Experience hassle-free online ordering from the comfort of
                  your home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex md:px-16 xl:px-44  flex-col md:grid grid-cols-2 gap-16 mx-auto w-full p-8 pb-16">
        <div className="flex flex-col justify-center items-start mt-12 ">
          <h1 className="text-[#102a42] md:text-4xl lg:text-6xl font-extrabold mb-4">
            Your Trusted Source for <br /> Health and Wellness
          </h1>
          <h5 className="text-[#617d98] text-xl leading-7">
            Discover a wide range of medications and <br /> personal care
            products.Explore our comprehensive selection of <br /> prescription
            and over-the-counter medications.
          </h5>

          <Link to="/products">
            <button className="bg-[#7fbdf0] transition-all duration-300 ease-linear hover:scale-105 hover:bg-[#a2ccf3] text-white px-6 md:px-12 tracking-widest rounded-md py-3 mt-4 md:py-4">
              Shop Now
            </button>
          </Link>
        </div>
        <article className="mt-12 hidden md:flex justify-end relative  self-end w-full">
          <div className="relative after flex justify-end before:bg-[#decbc0]">
            <img
              src="https://img.freepik.com/free-photo/closeup-doctor-stethoscope-with-coffee-paper-cup_53876-31272.jpg?t=st=1720465314~exp=1720468914~hmac=fc241ad3a0413f90b7494b93081c9d2216193c6000860ff27994ffdc3ee4cb68&w=360"
              alt="hero-img"
              width={400}
              height={550}
              className={`${loading ? "shimmer" : ""}`}
              onLoadingComplete={() => setLoading(false)}
            />
            <div className="absolute left-0 -translate-x-1/2 bottom-0 ">
              <img
                src="https://img.freepik.com/free-photo/young-sick-man-friend-having-video-call-with-doctor_23-2148944901.jpg?t=st=1720467814~exp=1720471414~hmac=da49d41430aecc81d919c70a931b6a249cc6fb8019edda506eab7ddab9392c48&w=740"
                alt="hero-img"
                width={250}
                height={165}
                className={`${loading ? "shimmer" : ""}`}
                onLoadingComplete={() => setLoading(false)}
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Home;
