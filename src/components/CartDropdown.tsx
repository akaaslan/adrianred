import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { removeFromCart, updateCartItemCount } from '../store/actions/shoppingCartActions';
import type { RootState } from '../store';

interface CartDropdownProps {
  textColor?: string;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ textColor = 'text-white' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.shoppingCart);

  const totalItems = cart.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.count), 0);

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

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex relative ${textColor} hover:text-gray-300 transition-all duration-200 hover:scale-110 ${
          isOpen ? 'text-blue-400' : ''
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

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div 
            className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-2xl z-50 border border-gray-200 max-w-[calc(100vw-2rem)] md:max-w-none transform -translate-x-1/2 md:translate-x-0 md:right-0 left-1/2 md:left-auto animate-dropdown"
          >
            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes animate-dropdown {
                  from {
                    opacity: 0;
                    transform: translateY(-10px) scale(0.95);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                  }
                }
                .animate-dropdown {
                  animation: animate-dropdown 0.3s ease-out forwards;
                }
              `
            }} />
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900">Shopping Cart</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-6">
                  <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <ShoppingCart className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-3 text-sm">Your cart is empty</p>
                  <Link
                    to="/shop"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors duration-200">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                          <img
                            src={item.product.images?.[0]?.url || `https://picsum.photos/60/60?random=${item.product.id}`}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-medium text-gray-900 truncate mb-1">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-blue-600 font-medium">${item.product.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-1 bg-white rounded p-1 border">
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, item.count - 1)}
                            className="w-5 h-5 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 transition-colors duration-150"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-medium text-gray-900">{item.count}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, item.count + 1)}
                            className="w-5 h-5 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 transition-colors duration-150"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="text-red-500 hover:text-red-600 p-1 hover:bg-red-50 rounded transition-colors duration-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Cart Summary */}
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-semibold text-gray-900">Total:</span>
                      <span className="text-lg font-bold text-blue-600">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="space-y-2">
                      <Link
                        to="/cart"
                        className="w-full block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-lg transition-colors duration-200 font-medium border border-gray-200 text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        View Cart
                      </Link>
                      <Link
                        to="/checkout"
                        className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg transition-colors duration-200 font-medium shadow-md text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
