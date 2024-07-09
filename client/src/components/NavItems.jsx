import React, { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./context/userContext";
import { CartContext } from "./context/cartContext";
import { VscAccount } from "react-icons/vsc";
import { RiShoppingBagLine } from "react-icons/ri";
import CartModal from "./cartModal";

const NavItems = () => {
  const { currentUser, logout } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [cartCount, setCartCount] = useState(cart.length);
  const timeoutRef = useRef(null);

  const toggleModal = () => {
    setShowModal((showModal) => !showModal);
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowPopover(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShowPopover(false), 200);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    setCartCount(cart.length);
  }, [cart]);

  return (
    <div className="container mx-auto flex justify-between items-center">
      {currentUser ? (
        <>
          <h1 className="text-2xl font-bold">MediMart</h1>
          <div className="flex items-center">
            <Link
              to="/home"
              className="bg-transparent py-1 px-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 hover:underline"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="bg-transparent py-1 px-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 hover:underline"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="bg-transparent py-1 px-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 hover:underline"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="bg-transparent py-1 px-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 hover:underline"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center flex-col">
                <VscAccount size={23} />
                <span className="mt-1 text-xs">My Account</span>
              </button>
              {showPopover && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-10"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="px-4 py-2 text-gray-700 border-b">
                    Welcome, {currentUser.name}
                  </div>
                  <button
                    onClick={toggleModal}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Orders
                  </button>
                  <Link
                    to="/favorites"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Favourites
                  </Link>
                  <Link
                    to="/account-settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Account Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <button
              className="relative flex items-center gap-0"
              onClick={toggleModal}
            >
              <RiShoppingBagLine
                size={23}
                className="w-7 h-7 fill-blue-500 hover:fill-blue-300"
              />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full text-white text-xs px-2">
                  {cartCount}
                </span>
              )}
            </button>
            <CartModal isOpen={showModal} toggleModal={toggleModal} />
          </div>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="bg-blue-400 hover:bg-blue-300/90 py-1 px-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-400 hover:bg-blue-300/90 py-1 px-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

export default NavItems;
