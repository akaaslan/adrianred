/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search, User, Heart, ShoppingCart, X, Plus, Minus } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/types";
import { logoutUser } from "../store";
import { getGravatarUrlSync } from "../utils/gravatar";
import { fetchCategories } from "../store/actions/thunkActions";
import CartDropdown from "../components/CartDropdown";
import { removeFromCart, updateCartItemCount } from '../store/actions/shoppingCartActions';

interface HeaderProps {
  theme?: "light" | "dark";
}

const Header: React.FC<HeaderProps> = ({ theme = "dark" }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.client.user);
  const categories = useSelector((state: RootState) => state.product.categories);
  const { cart } = useSelector((state: RootState) => state.shoppingCart);
  const isLoggedIn = user && typeof user === 'object' && Object.keys(user).length > 0;
  const isSpecialUser = user && user.email === 'mineldilaybayrak@hotmail.com';
  
  const totalItems = cart.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.count), 0);
  
  // Debug logging to see what's happening
  console.log('Header Debug - User object:', user);
  console.log('Header Debug - User type:', typeof user);
  console.log('Header Debug - User keys:', Object.keys(user || {}));
  console.log('Header Debug - IsLoggedIn:', isLoggedIn);
  
  const textColor = theme === "light" ? "text-gray-500 drop-shadow-lg" : "text-white";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const isHomePage = location.pathname === '/';

  // Fetch categories on component mount
  useEffect(() => {
    (dispatch as any)(fetchCategories());
  }, [dispatch]);

  const handleLogout = () => {
    // Clear tokens from both storage types
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    dispatch(logoutUser());
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const handleRemoveItem = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId: number, newCount: number) => {
    if (newCount <= 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateCartItemCount(productId, newCount));
    }
  };

  useEffect(() => {
    if (!isHomePage) return;
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-shadow duration-300 ${
        isHomePage ? (scrolled ? '' : '') : 'bg-gray-400/80 backdrop-blur-md'
      }`}
      style={{ position: 'fixed', top: '0px', left: 0, width: '100%', zIndex: 50 }}
    >
      {isHomePage && (
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
      )}
      {isHomePage && scrolled && (
        <div className={`header-bg header-bg-slide`}></div>
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between" style={{zIndex: 1}}>
        {/* Logo */}
        <div className={`text-3xl font-bold tracking-tight ${textColor} flex-shrink-0`}><Link to="/">adrianred</Link></div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/" className={`${textColor} font-bold`}>Home</Link>
          <div className="relative group">
            <button className={`${textColor} font-bold flex items-center gap-1 focus:outline-none`}>
              Shop
              <svg className={`w-4 h-4 transform transition-transform duration-200 group-hover:rotate-180 ${textColor}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            <div className="absolute left-0 mt-0 w-80 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
              <div className="p-4">
                <Link to="/shop" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded mb-2 font-semibold">
                  All Products
                </Link>
                
                {/* Categories organized by gender */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2 px-4">Kadın</h4>
                    {categories
                      .filter(cat => cat.gender.toLowerCase() === 'kadın')
                      .map(category => (
                        <Link
                          key={category.id}
                          to={`/shop/${category.gender}/${category.title}/${category.id}`}
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded transition-colors"
                        >
                          {category.title}
                        </Link>
                      ))}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2 px-4">Erkek</h4>
                    {categories
                      .filter(cat => cat.gender.toLowerCase() === 'erkek')
                      .map(category => (
                        <Link
                          key={category.id}
                          to={`/shop/${category.gender}/${category.title}/${category.id}`}
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded transition-colors"
                        >
                          {category.title}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link to="/team" className={`${textColor} font-bold`}>Team</Link>
          <Link to="/about" className={`${textColor} font-bold`}>About</Link>
          <Link to="/contact" className={`${textColor} font-bold`}>Contact</Link>
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
          <div className="md:hidden absolute top-full left-0 w-full bg-black bg-opacity-95 z-50 transition-all duration-300 transform overflow-visible"
            style={{
              transform: mobileMenuOpen ? 'scaleY(1)' : 'scaleY(0)',
              opacity: mobileMenuOpen ? 1 : 0,
              transformOrigin: 'top'
            }}
          >
            <div className="flex flex-col py-4 px-6 max-h-[80vh] overflow-y-auto overflow-x-visible">
              <nav className="flex flex-col gap-2 mb-6">
              <Link to="/" className={`${textColor} font-bold py-2 px-2 rounded hover:bg-gray-800 transition`}>Home</Link>
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
                  <Link to="/shop" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-semibold border-b">
                    All Products
                  </Link>
                  
                  {/* Kadın categories */}
                  <div className="px-4 py-2 bg-gray-50 font-bold text-gray-800">Kadın</div>
                  {categories
                    .filter(cat => cat.gender.toLowerCase() === 'kadın')
                    .map(category => (
                      <Link
                        key={category.id}
                        to={`/shop/${category.gender}/${category.title}/${category.id}`}
                        className="block px-6 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        {category.title}
                      </Link>
                    ))}
                  
                  {/* Erkek categories */}
                  <div className="px-4 py-2 bg-gray-50 font-bold text-gray-800">Erkek</div>
                  {categories
                    .filter(cat => cat.gender.toLowerCase() === 'erkek')
                    .map(category => (
                      <Link
                        key={category.id}
                        to={`/shop/${category.gender}/${category.title}/${category.id}`}
                        className="block px-6 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        {category.title}
                      </Link>
                    ))}
                </div>
              </div>
              <Link to="/team" className={`${textColor} font-bold py-2 px-2 rounded hover:bg-gray-800 transition`}>Team</Link>
              <Link to="/about" className={`${textColor} font-bold py-2 px-2 rounded hover:bg-gray-800 transition`}>About</Link>
              <Link to="/contact" className={`${textColor} font-bold py-2 px-2 rounded hover:bg-gray-800 transition`}>Contact</Link>
              <a href="#" className={`${textColor} font-bold py-2 px-2 rounded hover:bg-gray-800 transition`}>Pages</a>
            </nav>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col gap-2 flex-1">
                  {!isLoggedIn ? (
                    <>
                      <Link to="/login" className={`${textColor} font-bold py-2 px-2 rounded hover:bg-gray-800 transition flex items-center gap-2`}>
                        <User className="w-4 h-4" />
                        Login
                      </Link>
                      <Link to="/signup" className={`${textColor} font-bold py-2 px-2 rounded hover:bg-gray-800 transition flex items-center gap-2`}>
                        <User className="w-4 h-4" />
                        Register
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/profile" className={`${textColor} font-bold py-2 px-2 rounded hover:bg-gray-800 transition flex items-center gap-2`}>
                        <User className="w-4 h-4" />
                        My Account
                      </Link>
                      <Link to="/orders" className={`${textColor} font-bold py-2 px-2 rounded hover:bg-gray-800 transition flex items-center gap-2`}>
                        <User className="w-4 h-4" />
                        Order History
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className={`${textColor} font-bold py-2 px-2 rounded hover:bg-gray-800 transition flex items-center gap-2 text-left`}
                      >
                        <User className="w-4 h-4" />
                        Logout
                      </button>
                      
                      {/* Special Button for Mobile */}
                      {isSpecialUser && (
                        <Link 
                          to="/x9k2m5p8q1w3"
                          className={`${textColor} font-bold py-2 px-2 rounded hover:bg-gray-800 transition flex items-center gap-2 border border-current`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className="text-sm">✨</span>
                          BURAYA TIKLA
                        </Link>
                      )}
                    </>
                  )}
                </div>
              </div>
              
              {/* Mobile Icons Section */}
              <div className="flex items-center justify-center gap-6 border-t border-gray-700 pt-4">
                <button className={`${textColor} hover:text-gray-300 p-2`} title="Search">
                  <Search className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setMobileCartOpen(!mobileCartOpen)}
                  className={`flex relative ${textColor} hover:text-gray-300 p-2 transition-all duration-200 hover:scale-110 ${
                    mobileCartOpen ? 'text-blue-400' : ''
                  }`}
                  title="Shopping Cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1 animate-pulse">
                      {totalItems}
                    </span>
                  )}
                </button>
                <Link to="/wishlist" className={`flex relative ${textColor} hover:text-gray-300 p-2`} title="Wishlist">
                  <Heart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                </Link>
              </div>

              {/* Mobile Cart Dropdown */}
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                mobileCartOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="border-t border-gray-300 mt-4 pt-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg mx-4 p-4 shadow-lg border border-blue-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                          <ShoppingCart className="w-3 h-3 text-white" />
                        </div>
                        Shopping Cart
                      </h3>
                      <button
                        onClick={() => setMobileCartOpen(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 hover:bg-white rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {cart.length === 0 ? (
                      <div className="text-center py-6">
                        <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 shadow-sm border border-blue-100">
                          <ShoppingCart className="w-8 h-8 text-blue-400" />
                        </div>
                        <p className="text-gray-600 text-sm mb-3">Your cart is empty</p>
                        <Link
                          to="/shop"
                          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                          onClick={() => {
                            setMobileCartOpen(false);
                            setMobileMenuOpen(false);
                          }}
                        >
                          Continue Shopping
                        </Link>
                      </div>
                    ) : (
                      <>
                        <div className="max-h-40 overflow-y-auto pr-2 space-y-2">
                          {cart.map((item) => (
                            <div key={item.product.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-100 hover:border-blue-200 hover:shadow-sm transition-all duration-200">
                              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                                <img
                                  src={item.product.images?.[0]?.url}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-gray-800 truncate mb-1">
                                  {item.product.name}
                                </h4>
                                <p className="text-xs text-blue-600 font-bold">${item.product.price}</p>
                              </div>
                              <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border border-gray-200">
                                <button
                                  onClick={() => handleUpdateQuantity(item.product.id, item.count - 1)}
                                  className="w-6 h-6 rounded bg-white hover:bg-blue-50 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors duration-150 border border-gray-200 hover:border-blue-200"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-8 text-center text-sm font-bold text-gray-800">{item.count}</span>
                                <button
                                  onClick={() => handleUpdateQuantity(item.product.id, item.count + 1)}
                                  className="w-6 h-6 rounded bg-white hover:bg-blue-50 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors duration-150 border border-gray-200 hover:border-blue-200"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <button
                                onClick={() => handleRemoveItem(item.product.id)}
                                className="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 rounded transition-colors duration-200"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t border-blue-200 pt-4 mt-4">
                          <div className="flex justify-between items-center mb-4 bg-white rounded-lg p-3 border border-blue-100">
                            <span className="font-bold text-base text-gray-800">Total:</span>
                            <span className="font-bold text-lg text-blue-600">${totalPrice.toFixed(2)}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <Link
                              to="/shopping-cart"
                              className="bg-white hover:bg-gray-50 text-gray-800 px-3 py-2 rounded-lg text-sm text-center font-semibold transition-colors duration-200 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                              onClick={() => {
                                setMobileCartOpen(false);
                                setMobileMenuOpen(false);
                              }}
                            >
                              View Cart
                            </Link>
                            <Link
                              to="/checkout"
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm text-center font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                              onClick={() => {
                                setMobileCartOpen(false);
                                setMobileMenuOpen(false);
                              }}
                            >
                              Checkout
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Right-side Icons */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative group">
            {!isLoggedIn ? (
              <Link 
                to="/login"
                className={`flex items-center gap-2 ${textColor} hover:text-gray-300 focus:outline-none`} 
                title="Login"
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-sm font-bold">Login / Register</span>
              </Link>
            ) : (
              <button 
                className={`flex items-center gap-2 ${textColor} hover:text-gray-300 focus:outline-none`} 
                title="User Account"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                {(user.email || user.mail || user.emailAddress) && (
                  <img 
                    src={getGravatarUrlSync(user.email || user.mail || user.emailAddress, 32)} 
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-white/20"
                  />
                )}
                <span className="text-sm font-sm font-bold">
                  {user.name || user.firstName || user.email || user.mail || user.emailAddress || user.username || 'Account'}
                </span>
              </button>
            )}
            
            <div className="absolute right-0 mt-0 w-64 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Login</Link>
                  <Link to="/signup" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Register</Link>
                </>
              ) : (
                <>
                  <div className="px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      {(user.email || user.mail || user.emailAddress) && (
                        <img 
                          src={getGravatarUrlSync(user.email || user.mail || user.emailAddress, 40)} 
                          alt="Profile"
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.name || user.firstName || user.username || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email || user.mail || user.emailAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">My Account</Link>
                  <Link to="/orders" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Order History</Link>
                  <div className="border-t border-gray-200"></div>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
          
          {/* Special Button for Special User */}
          {isSpecialUser && (
            <Link 
              to="/x9k2m5p8q1w3"
              className={`${textColor} hover:text-gray-300 px-3 py-1 rounded border border-current transition-colors hover:bg-white hover:text-gray-800`}
              title="Special Access"
            >
              <span className="text-sm font-bold">BURAYA TIKLA</span>
            </Link>
          )}
          
          <button className={`${textColor} hover:text-gray-300`} title="Search">
            <Search className="w-5 h-5" />
          </button>
          <CartDropdown textColor={textColor} />
          <Link to="/wishlist" className={`flex relative ${textColor} hover:text-gray-300`} title="Wishlist">
            <Heart className="w-5 h-5" />
            <span className="ml-3 b-1"> 3 </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;