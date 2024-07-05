import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './context/userContext';
import { VscAccount } from "react-icons/vsc";

const NavItems = () => {
  const { currentUser, logout } = useContext(UserContext);

  return (
    <div className='flex items-center gap-5'>
      
      {currentUser ? (
        <>
          <Link to="/home" className="bg-transparent py-1 px-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">Home</Link>
          <Link to="/products" className="bg-transparent py-1 px-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">Products</Link>
          <Link to="/about" className="bg-transparent py-1 px-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">About Us</Link>
          <Link to="/contact" className="bg-transparent py-1 px-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">Contact</Link>
          {/* <button className="text-black bg-blue-300">Welcome, {currentUser.name} </button> */}
          <button><VscAccount size={28}/></button>
          <button onClick={logout} className="bg-blue-400 hover:bg-blue-300/90 py-1 px-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" className="bg-blue-400 hover:bg-blue-300/90 py-1 px-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">Login</Link>
          <Link to="/signup" className="bg-blue-400 hover:bg-blue-300/90 py-1 px-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">Sign Up</Link>
        </>
      )}
    </div>
  );
};

export default NavItems;
