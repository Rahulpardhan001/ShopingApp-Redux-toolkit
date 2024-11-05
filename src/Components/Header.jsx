import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaCartPlus } from "react-icons/fa";
import { useSelector } from 'react-redux';

function Header() {
  const [isOpen, setIsOpen] = useState(false); // Manage mobile menu visibility
  const { cart } = useSelector((state) => state.cart);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-[url('../src/assets/im/herobg.jpg')] ">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="../src/assets/im/logo-white.png" alt="Logo" className="h-8" />
          <span className="text-2xl font-semibold text-white">Brand</span>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Links for Desktop */}
        <nav className="hidden md:flex space-x-8 text-white text-xl">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/about" className="hover:text-blue-500">About</Link>
          <Link to="/wishlist" className="hover:text-blue-500 flex items-center">
            <FaHeart className="text-red-500 " />
          </Link>
          <Link to="/cart" className="relative hover:text-blue-500 flex items-center">
            <FaCartPlus />
            <span className="absolute animate-bounce top-[-13px] right-[-4px] bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cart.reduce((acc, curElem) => acc + curElem.quantity, 0)}
            </span>
          </Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1c1a26]">  
          <nav className="flex flex-col space-y-2 p-4 text-white">
            <Link to="/" onClick={toggleMenu} className="hover:text-blue-500">Home</Link>
            <Link to="/about" onClick={toggleMenu} className="hover:text-blue-500">About</Link>
            <Link to="/wishlist" onClick={toggleMenu} className="hover:text-blue-500">
              <FaHeart className="text-red-500" />
            </Link>
            <Link to="/cart" onClick={toggleMenu} className="relative hover:text-blue-500">
              <FaCartPlus />
              <span className="absolute top-[-10px] right-[-10px] bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.reduce((acc, curElem) => acc + curElem.quantity, 0)}
              </span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
