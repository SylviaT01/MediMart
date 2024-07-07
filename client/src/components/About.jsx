
import React from 'react';
import { Parallax } from 'react-parallax';
import Pharmacist from './assets/Pharmacist.jpg';

const AboutUs = () => {
  return (


    <div className="bg-gray-100 ">
      <div className="header">
        <Parallax
          className="w-full h-[calc(100vh-5rem)] object-cover brightness-[.6]"
          bgImage="https://img.freepik.com/free-photo/young-woman-pharmacist-pharmacy_1303-25532.jpg?t=st=1720387419~exp=1720391019~hmac=3a68cfa2b5ffe124e3e358c8bf8a09e5f0afb048c942cf6c14ca7545f203e033&w=740"
          strength={225}>
          <div style={{ height: 500 }}>
            <p className="text-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] uppercase font-extralight text-blue-100 text-8xl">
              MediMart
            </p>
          </div>
        </Parallax>
      </div>
      <div className="container mx-auto px-4 py-8 flex justify-center items-center flex-col ">
        <h1 className="text-3xl font-bold mb-4">Medimart</h1>
        <p className="text-gray-700 leading-relaxed">
          Welcome to Medimart, your trusted partner in health and wellness. At Medimart, we are committed to providing convenient access to high-quality medications and healthcare products, delivered right to your doorstep. Whether you're managing a chronic condition or simply looking for everyday health products, Medimart is here to support you every step of the way. Trust, reliability, and customer satisfaction are at the heart of what we do. Join us in our journey towards better health and a brighter future with Medimart.
        </p>
      </div>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-16">
        <div className="md:w-1/2 md:pr-8">
          <h1 className="text-2xl font-semibold mb-4">Mission and Vision</h1>
          <p className="text-lg text-gray-700 mb-6">
            'At Medimart, we are dedicated to providing high-quality medications and healthcare essentials, delivered with reliability and care. We empower individuals and families to manage their health proactively, ensuring convenience and satisfaction every step of the way.'
          </p>
          <p className="text-lg text-gray-700 mb-6">
            To lead in delivering convenient access to essential health products, promoting well-being for all.
          </p>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img src={Pharmacist} alt="About Us" className="rounded-lg shadow-md" />
        </div>
      </div>
      <hr className="my-6 border-gray-300" />
      <div className="  py-12">
        <div className="container mx-auto flex justify-center items-center flex-col">
          <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold">Quality</h3>
              <p className="text-gray-700">We uphold the highest standards in the quality of products and services we offer.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold">Commitment</h3>
              <p className="text-gray-700">We are committed to ensuring customer satisfaction and delivering on our promises.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold">Innovation</h3>
              <p className="text-gray-700">We continuously innovate to provide new and better solutions for our customers' health needs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
