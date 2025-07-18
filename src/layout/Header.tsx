import { Search, User, ShoppingCart, Heart } from "lucide-react";
import React, { useState, useEffect } from "react";

interface HeaderProps {
  theme?: "light" | "dark";
}

const Header: React.FC<HeaderProps> = ({ theme = "dark" }) => {
  const textColor = theme === "light" ? "text-gray-500 drop-shadow-lg" : "text-white";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-shadow duration-300 ${scrolled ? '' : ''}`}
      style={{ position: 'fixed', top: '0px', left: 0, width: '100%', zIndex: 50 }}
    >
      <style>{`
        .header-bg {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          z-index: 0;
          background: rgba(156, 163, 175, 0.8); /* Tailwind gray-400/80 */
          backdrop-filter: blur(8px);
          pointer-events: none;
          transition: box-shadow 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .header-bg-slide {
          animation: headerBgSlideDown 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes headerBgSlideDown {
          from {
            transform: translateY(-30px);
            opacity: 0.7;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
      {scrolled && (
        <div className={`header-bg header-bg-slide`}></div>
      )}
      <div className="relative max-w-7xl mx-[10vw] px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between" style={{zIndex: 1}}>
        {/* Logo */}
        <div className={`text-3xl font-bold tracking-tight ${textColor} flex-shrink-0`}><a href="/">adrianred</a></div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="/" className={`${textColor} font-bold`}>Home</a>
          <div className="relative group">
            <button className={`${textColor} font-bold flex items-center gap-1 focus:outline-none`}>
              Shop
              <svg className={`w-4 h-4 transform transition-transform duration-200 group-hover:rotate-180 ${textColor}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            <div className="absolute left-0 mt-0 w-40 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">All Products</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Men</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Women</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Sale</a>
            </div>
          </div>
          <a href="#" className={`${textColor} font-bold`}>About</a>
          <a href="#" className={`${textColor} font-bold`}>Blog</a>
          <a href="#" className={`${textColor} font-bold`}>Contact</a>
          <a href="#" className={`${textColor} font-bold`}>Pages</a>
        </nav>

        {/* Mobile menu button */}
        <button
          className={`md:hidden ${textColor} focus:outline-none`}
          title="Open menu"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black bg-opacity-95 flex flex-col py-4 px-6 z-50 transition-all duration-300 transform origin-top scale-y-0 opacity-0"
            style={{
              transform: mobileMenuOpen ? 'scaleY(1)' : 'scaleY(0)',
              opacity: mobileMenuOpen ? 1 : 0,
            }}
          >
            <nav className="flex flex-col gap-2 mb-6">
              <a href="#" className={`${textColor} font-bold py-2 px-2 rounded hover:bg-gray-800 transition`}>Home</a>
              <div className="relative">
                <button
                  className={`w-full ${textColor} font-bold flex items-center justify-between gap-1 focus:outline-none py-2 px-2 rounded hover:bg-gray-800 transition`}
                  onClick={() => setMobileShopOpen((open) => !open)}
                  aria-expanded={mobileShopOpen}
                >
                  <span className="text-center">Shop</span>
                  <svg className={`w-4 h-4 transform transition-transform duration-200 ${mobileShopOpen ? 'rotate-180' : ''} ${textColor}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${mobileShopOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} bg-white rounded shadow-lg mt-2 ml-2`}> 
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">All Products</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Men</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Women</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Sale</a>
                </div>
              </div>
              <a href="#" className={`${textColor} font-bold py-2 px-2 rounded hover:bg-gray-800 transition`}>About</a>
              <a href="#" className={`${textColor} font-bold py-2 px-2 rounded hover:bg-gray-800 transition`}>Blog</a>
              <a href="#" className={`${textColor} font-bold py-2 px-2 rounded hover:bg-gray-800 transition`}>Contact</a>
              <a href="#" className={`${textColor} font-bold py-2 px-2 rounded hover:bg-gray-800 transition`}>Pages</a>
            </nav>
            <div className="flex items-center gap-4 justify-end">
              <button className={`flex items-center gap-2 ${textColor} hover:text-gray-300`} title="User Account">
                <User className="w-5 h-5" />
                <span className="text-sm font-sm font-bold">Login / Register</span>
              </button>
              <button className={`${textColor} hover:text-gray-300`} title="Search">
                <Search className="w-5 h-5" />
              </button>
              <button className={`flex relative ${textColor} hover:text-gray-300`} title="Shopping Cart">
                <ShoppingCart className="w-5 h-5" />
                <span className="ml-3 b-1"> 3 </span>
              </button>
              <button className={`flex relative ${textColor} hover:text-gray-300`} title="Shopping Cart">
                <Heart className="w-5 h-5" />
                <span className="ml-3 b-1"> 3 </span>
              </button>
            </div>
          </div>
        )}

        {/* Right-side Icons */}
        <div className="hidden md:flex items-center gap-4">
          <button className={`flex items-center gap-2 ${textColor} hover:text-gray-300`} title="User Account">
            <User className="w-5 h-5" />
            <span className="text-sm font-sm font-bold">Login / Register</span>
          </button>
          <button className={`${textColor} hover:text-gray-300`} title="Search">
            <Search className="w-5 h-5" />
          </button>
          <button className={`flex relative ${textColor} hover:text-gray-300`} title="Shopping Cart">
            <ShoppingCart className="w-5 h-5" />
            <span className="ml-3 b-1"> 3 </span>
          </button>
          <button className={`flex relative ${textColor} hover:text-gray-300`} title="Shopping Cart">
            <Heart className="w-5 h-5" />
            <span className="ml-3 b-1"> 3 </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;