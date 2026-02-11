import React, { useEffect, useState } from 'react';
import { Search, ShoppingCart, User, ChevronDown, Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';
import TopBar from './TopBar.jsx';

function Header() {
  const { getCartCount } = useCart();
  const [showCategories, setShowCategories] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // const categories = [
  //   'Parfums Dubai',
  //   'Collections Privées',
  //   'Exclusivité AK',
  //   'Parfums d\'intérieur'
  // ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) { // 40px = hauteur approximative du TopBar
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <div className={`transition-all duration-300 ${isScrolled ? 'hidden' : 'block'}`}>
        <TopBar />
      </div>
    <div className={`bg-white shadow-sm transition-all duration-300 z-50 ${
        isScrolled ? 'fixed top-0 left-0 w-full' : 'sticky top-0'
      }`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Desktop & Mobile Header */}
        <div className="flex items-center justify-between gap-4">
          {/* Menu Hamburger - Mobile Only */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden text-gray-800 hover:text-[#ffcc00] transition-colors"
          >
            {showMobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Logo */}
         <Link to="/"> <div className="flex items-center h-10 w-40">
              <img src={logo} alt="AK Parfumerie" className="" />
            </div>
            </Link>

          {/* Search bar - Desktop Only */}
          <div className="  bg-[#e9ecee] rounded-lg">
            <div className="flex items-center w-full">
              <input
                type="text"
                placeholder="Rechercher des produits"
                className=" px-4 py-3 bg-transparent outline-none text-sm tracking-wider uppercase text-muted-foreground"
              />
              <button className="bg-[#ffcc00] text-white p-3 rounded-r-lg transition-colors outline-none hover:bg-[#e6b800]">
                <Search size={24} />
              </button>
            </div>
          </div>

          {/* Mobile Search Icon */}
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className=" lg:hidden text-gray-800 hover:text-[#ffcc00] transition-colors "
          >
            <Search size={24} />
          </button>

         <Link to="/boutique" className="hidden md:flex">
              <button className="flex items-center gap-2 hover:text-[#ffcc00] transition-colors text-sm tracking-wider uppercase text-muted-foreground">
                <span className="text-sm tracking-wider uppercase text-muted-foreground hover:text-foreground 
                transition-colors duration-300">Boutique</span>
              </button>
            </Link>

            <Link to="/catologue" className="hidden md:flex">
              <button className="flex items-center gap-2 hover:text-[#ffcc00] transition-colors text-sm tracking-wider uppercase text-muted-foreground">
                <span className="text-sm tracking-wider uppercase text-muted-foreground hover:text-foreground 
                transition-colors duration-300">Catologue</span>
              </button>
            </Link>

             <Link to="/apropos" className="hidden md:flex">
              <button className="flex items-center gap-2 hover:text-[#ffcc00] transition-colors text-sm tracking-wider uppercase text-muted-foreground">
                <span className="text-sm tracking-wider uppercase text-muted-foreground hover:text-foreground 
                transition-colors duration-300">À Propos</span>
              </button>
            </Link>

            <Link to="/contact" className="hidden md:flex">
              <button className="flex items-center gap-2 hover:text-[#ffcc00] transition-colors text-sm tracking-wider uppercase text-muted-foreground">
                <span className="text-sm tracking-wider uppercase text-muted-foreground hover:text-foreground 
                transition-colors duration-300">Contact</span>
              </button>
            </Link>

          {/* Account & Cart */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* Desktop Login */}
            <Link to="/login" className="hidden md:flex">
              <button className="flex items-center gap-2 hover:text-[#ffcc00] transition-colors text-sm tracking-wider uppercase text-muted-foreground">
                <User size={24} />
                {/* <span className="text-sm tracking-wider uppercase text-muted-foreground hover:text-foreground 
                transition-colors duration-300">Connexion</span> */}
              </button>
            </Link>


            {/* Mobile Login Icon */}
            <Link to="/login" className="md:hidden">
              <button className="hover:text-[#ffcc00] transition-colors">
                <User size={24} />
              </button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <button className="flex items-center gap-2 relative hover:text-[#ffcc00] transition-colors text-sm tracking-wider uppercase text-muted-foreground">
                <ShoppingCart size={24} />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#ffcc00] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="lg:hidden mt-4 bg-[#e9ecee] rounded-lg">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Rechercher des produits"
                className="flex-1 px-4 py-3 bg-transparent outline-none"
              />
              <button className="bg-[#ffcc00] text-white p-3 rounded-r-lg transition-colors outline-none hover:bg-[#e6b800]">
                <Search size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden mt-4 pb-4">
            {/* Categories */}
    

            {/* Mobile Menu Links */}
            <div className="mt-4 space-y-2">
              <Link
                to="/login"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <User size={20} />
                {/* <span className="font-semibold text-gray-800">Connexion / Inscription</span> */}
              </Link>

              <Link
                to="/cart"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ShoppingCart size={20} />
                {/* <span className="font-semibold text-gray-800">Mon Panier</span> */}
                {getCartCount() > 0 && (
                  <span className="ml-auto bg-[#ffcc00] text-white text-xs px-2 py-1 rounded-full font-medium">
                    {getCartCount()}
                  </span>
                )}
              </Link>
            </div>

            {/* Additional Links */}
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:text-[#ffcc00] transition-colors">
                À propos
              </a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:text-[#ffcc00] transition-colors">
                Contact
              </a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:text-[#ffcc00] transition-colors">
                Aide
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default Header;