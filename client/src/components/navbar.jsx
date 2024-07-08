import React from 'react';
import NavItems from './NavItems';


const NavBar = () => {
  return (
    <nav className="bg-slate-200 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavItems />
      </div>
    </nav>
  );
};

export default NavBar;

