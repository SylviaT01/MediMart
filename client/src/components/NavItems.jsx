import React from 'react';
import { Link } from 'react-router-dom';

const NavItems = () => {
  return (
    <div className='flex items-center gap-5'>
      <Link to="/" className="bg-transparent py-1 px-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">Home</Link>
      <Link to="/products" className="bg-transparent py-1 px-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">Products</Link>
      <Link to="/about" className="bg-transparent  py-1 px-2 transition ease-in-out hover:-translate-y-1 hover:scale-110  duration-300">About Us</Link>
      <Link to="/login" className="bg-blue-400 hover:bg-blue-300/90 py-1 px-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">Login</Link>
      <Link to="/signup" className="bg-blue-400 hover:bg-blue-300/90 py-1 px-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">Sign Up</Link>
    </div>
  );
};

export default NavItems;
