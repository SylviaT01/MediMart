
import React from 'react';
import { GiCompass, GiDiamondHard } from 'react-icons/gi';
import { Parallax } from 'react-parallax';
import { FaCheckCircle } from 'react-icons/fa';
import { RiHandHeartLine } from 'react-icons/ri';
import { AiOutlineRocket } from 'react-icons/ai';
import Pharmacist from './assets/Pharmacist.jpg';

const AboutUs = () => {

  const services = [
    {
      id: 1,
      icon: <GiCompass />,
      title: 'Mission',
      text: 'At Medimart, we are dedicated to providing high-quality medications and healthcare essentials, delivered with reliability and care. We empower individuals and families to manage their health proactively, ensuring convenience and satisfaction every step of the way.',
    },
    {
      id: 2,
      icon: <GiDiamondHard />,
      title: 'Vision',
      text: `To lead in delivering convenient access to essential health products, promoting well-being for all.`,
    },
    
  ];
  const values = [
    {
      id: 1,
      icon: <FaCheckCircle />,
      title: 'Quality',
      text: 'We uphold the highest standards in the quality of products and services we offer.',
    },
    {
      id: 2,
      icon: <RiHandHeartLine />,
      title: 'Commitment',
      text: 'We are committed to ensuring customer satisfaction and delivering on our promises.',
    },
    {
      id: 3,
      icon: <AiOutlineRocket />,
      title: 'Innovation',
      text: 'We continuously innovate to provide new and better solutions for our customers\' health needs.',
    },
  ];

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
			<section className='grid grid-cols-1 md:grid-cols-2 p-2 md:p-10'>
				<article className='w-full h-full p-8 '>
					<img src={Pharmacist} alt='about' height='650px' width='600px' layout='responsive' className='rounded-lg' />
				</article>

				<article className='p-8 '>
					<h2 className='capitalize font-bold'>About MediMart</h2>
					<div className='h-1 mt-2 w-224 bg-[#7594e9]' />
					<p className='text-base mt-8 leading-8 text-[#617d98]'>
          Welcome to Medimart, your trusted partner in health and wellness. At Medimart, we are committed to providing convenient access to high-quality medications and healthcare products, delivered right to your doorstep. Whether you're managing a chronic condition or simply looking for everyday health products, Medimart is here to support you every step of the way. Trust, reliability, and customer satisfaction are at the heart of what we do. Join us in our journey towards better health and a brighter future with Medimart.
					</p>
				</article>
			</section>
      <section className='bg-gray-100 py-20 pt-8 '>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-16 md:gap-6 mt-8   md:px-32'>
				{services.map((service) => (
					<div key={service.id} className='bg-slate-100 hover:scale-105 duration-300 ease-linear shadow-lg py-6 px-8 flex justify-center flex-col text-center items-center gap-4 mx-8  md:mx-0 rounded-lg'>
						<div className='w-20 h-20 flex items-center justify-center bg-slate-100 rounded-full mb-4 border border-blue-200 '>
							<span className='text-3xl flex justify-center text-blue-400'>{service.icon}</span>
						</div>
						<h3 className=' font-semibold'>{service.title}</h3>
						<p className='leading-7 text-sm text-[#617d98]'>{service.text}</p>
					</div>
				))}
			</div>
      </section>
      
      <hr className="my-6 border-gray-300" />
      <div className="py-12">
      <div className="container mx-auto flex justify-center items-center flex-col">
        <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div key={value.id} className="bg-slate-100 hover:scale-105 duration-300 ease-linear shadow-lg py-6 px-8 flex justify-center flex-col text-center items-center gap-4 mx-8  md:mx-0 rounded-lg">
              <div className="w-20 h-20 flex items-center justify-center bg-slate-100 rounded-full mb-4 border border-blue-200">
              <span className="text-4xl text-blue-400">{value.icon}</span>
              </div>
              <h3 className="text-xl font-semibold">{value.title}</h3>
              <p className="text-[#617d98]">{value.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
