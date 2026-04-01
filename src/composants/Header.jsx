import React, { useEffect, useState } from "react";
import { Search, ShoppingCart, User, Menu, X, LogOut, ChevronDown } from "lucide-react";
import logo from "../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext.jsx";
import TopBar from "./TopBar.jsx";

function Header({ onOpenLogin, onOpenRegister }) {
  const { getCartCount } = useCart();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  // Récupérer l'utilisateur connecté
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setShowUserMenu(false);
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `text-sm tracking-wider uppercase transition-colors duration-300 pb-1 ${
      isActive
        ? "text-foreground border-b-2 border-[#ffcc00]"
        : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <>
      <div className={`transition-all duration-300 ${isScrolled ? "hidden" : "block"}`}>
        <TopBar />
      </div>
      <div
        className={`bg-white shadow-sm transition-all duration-300 z-50 ${
          isScrolled ? "fixed top-0 left-0 w-full" : "sticky top-0"
        }`}
      >
        <div className="max-w-7xl mx-auto py-2">
          <div className="flex items-center justify-evenly gap-4">
            {/* Hamburger Mobile */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden text-gray-800 hover:text-[#ffcc00] transition-colors"
            >
              {showMobileMenu ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Logo */}
            <Link to="/">
              <div className="flex items-center h-10 w-40">
                <img src={logo} alt="AK Parfumerie" />
              </div>
            </Link>

            {/* Nav Desktop */}
            <div className="hidden md:flex items-center gap-6 flex-shrink-0">
              <NavLink to="/boutique" className={navLinkClass}>Boutique</NavLink>
              <NavLink to="/catologue" className={navLinkClass}>Catalogue</NavLink>
              <NavLink to="/apropos" className={navLinkClass}>À Propos</NavLink>
              <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            </div>

            {/* Search + User + Cart */}
            <div className="flex items-center gap-3 md:gap-6">
              {/* Search Desktop */}
              <div className="hidden md:flex flex-1 w-96 min-w-[400px] bg-[#e9ecee] rounded-lg">
                <div className="flex items-center w-full">
                  <input
                    type="text"
                    placeholder="Rechercher des produits"
                    className="flex-1 px-4 py-3 bg-transparent outline-none text-sm tracking-wider uppercase text-muted-foreground"
                  />
                  <button className="bg-[#ffcc00] text-white p-3 rounded-r-lg hover:bg-[#e6b800]">
                    <Search size={24} />
                  </button>
                </div>
              </div>

              {/* Search Mobile */}
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="md:hidden text-gray-800 hover:text-[#ffcc00] transition-colors"
              >
                <Search size={24} />
              </button>

              {/* User connecté ou non */}
              {user ? (
                // ✅ Utilisateur connecté → afficher son nom
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 hover:text-[#ffcc00] transition-colors text-sm tracking-wider uppercase text-muted-foreground"
                  >
                    {/* <div className="w-8 h-8 bg-[#ffcc00] rounded-full flex items-center justify-center text-white font-bold text-xs">
                      {user.username?.charAt(0).toUpperCase()}
                    </div> */}
                    <span className="hidden md:block font-medium text-gray-800 clanp">
                      {user.username}
                    </span>
                    <ChevronDown size={16} />
                  </button>

                  {/* Dropdown menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-800">{user.username}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#ffcc00] transition-colors"
                      >
                        <User size={16} />
                        Mon profil
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#ffcc00] transition-colors"
                      >
                        <ShoppingCart size={16} />
                        Mes commandes
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors rounded-b-xl"
                      >
                        <LogOut size={16} />
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // ✅ Pas connecté → icône user
                <Link to="/login"
                 
                  className="flex items-center gap-2 hover:text-[#ffcc00] transition-colors text-sm tracking-wider uppercase text-muted-foreground"
                >
                  <User size={24} />
                  <span className="hidden md:block">Connexion</span>
                </Link>
              )}

              {/* Cart */}
              <Link to="/cart">
                <button className="flex items-center gap-2 relative hover:text-[#ffcc00] transition-colors text-sm tracking-wider uppercase text-muted-foreground">
                  <ShoppingCart size={24} />
                  <span className="absolute -top-2 -right-2 bg-[#ffcc00] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {getCartCount()}
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          {showMobileSearch && (
            <div className="lg:hidden mt-4 bg-[#e9ecee] rounded-lg">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Rechercher des produits"
                  className="flex-1 px-4 py-3 bg-transparent outline-none"
                />
                <button className="bg-[#ffcc00] text-white p-3 rounded-r-lg hover:bg-[#e6b800]">
                  <Search size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="lg:hidden mt-4 pb-4">
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                <Link to="/boutique" className="block px-4 py-2 text-gray-700 hover:text-[#ffcc00]">Boutique</Link>
                <Link to="/catologue" className="block px-4 py-2 text-gray-700 hover:text-[#ffcc00]">Catalogue</Link>
                <Link to="/apropos" className="block px-4 py-2 text-gray-700 hover:text-[#ffcc00]">À Propos</Link>
                <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:text-[#ffcc00]">Contact</Link>
                {user ? (
                  <>
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:text-[#ffcc00]">
                      Mon profil ({user.username})
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <button
                    onClick={onOpenLogin}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:text-[#ffcc00]"
                  >
                    Connexion
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;