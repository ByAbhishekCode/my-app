import React, { useState } from "react";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and brand name */}
        <div className="flex items-center">
          <img
            src="assets/logo/Icon.png"
            alt="E-Comm Logo"
            className="h-8 w-8 mr-2"
          />
          <div className="text-2xl font-bold text-primary">E-Comm</div>
        </div>

        {/* Desktop Navigation - Centered */}
        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Bag
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Sneakers
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Belt
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-6">
          <button className="text-gray-600 hover:text-primary">
            <span className="text-xl">🛒</span>
            <span className="sr-only">Cart</span>
          </button>
          <button className="text-gray-600 hover:text-primary">
            <span className="text-xl"> Items</span>
            <span className="sr-only">Account</span>
          </button>
          <button className="text-gray-600 hover:text-primary">
            <span className="text-xl">$ 0.00</span>
            <span className="sr-only">Wishlist</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-primary focus:outline-none"
          >
            {isMenuOpen ? (
              <span className="text-2xl">✕</span> // Close icon
            ) : (
              <span className="text-2xl">☰</span> // Hamburger icon
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 px-4">
          <div className="flex flex-col space-y-4">
            <a
              href="#"
              className="text-gray-700 hover:text-primary font-medium transition-colors py-2"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-primary font-medium transition-colors py-2"
            >
              Bag
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-primary font-medium transition-colors py-2"
            >
              Sneakers
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-primary font-medium transition-colors py-2"
            >
              Belt
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-primary font-medium transition-colors py-2"
            >
              Contact
            </a>

            {/* Mobile Actions */}
            <div className="flex justify-between pt-4 border-t border-gray-200">
              <button className="text-gray-600 hover:text-primary flex items-center">
                <span className="text-xl mr-2">🛒</span>
                <span>Cart</span>
              </button>
              <button className="text-gray-600 hover:text-primary flex items-center">
                <span className="text-xl mr-2">👤</span>
                <span>Items</span>
              </button>
              <button className="text-gray-600 hover:text-primary flex items-center">
                <span className="text-xl mr-2">💲</span>
                <span>$0.00</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
