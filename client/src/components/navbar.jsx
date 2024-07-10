import React from 'react';
import NavItems from './NavItems';


const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-200 shadow-md p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <NavItems />
      </div>
    </nav>
  );
};

export default NavBar;

