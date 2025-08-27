/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { toast } from 'react-toastify';
import { removeFromCart, updateCartItemCount, toggleCartItemCheck, clearCart } from '../store/actions/shoppingCartActions';
import type { RootState } from '../store/types';

export default function ShoppingCartPage() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.shoppingCart);
  const [selectAll, setSelectAll] = useState(true);

  // Calculate totals for selected items
  const selectedItems = cart.filter(item => item.checked);
  const totalQuantity = selectedItems.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = selectedItems.reduce((sum, item) => sum + (item.product.price * item.count), 0);

  // Handle quantity changes
  const handleQuantityChange = (productId: number, newCount: number) => {
    if (newCount < 1) return;
    dispatch(updateCartItemCount(productId, newCount));
  };

  // Handle remove item
  const handleRemoveItem = (productId: number, productName: string) => {
    dispatch(removeFromCart(productId));
    toast.success(`${productName} sepetten kaldırıldı`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  // Handle toggle item check
  const handleToggleCheck = (productId: number) => {
    dispatch(toggleCartItemCheck(productId));
  };

  // Handle select all toggle
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    
    // Toggle all items
    cart.forEach(item => {
      if (item.checked !== newSelectAll) {
        dispatch(toggleCartItemCheck(item.product.id));
      }
    });
  };

  // Handle clear cart
  const handleClearCart = () => {
    if (window.confirm('Sepeti tamamen temizlemek istediğinizden emin misiniz?')) {
      dispatch(clearCart());
      toast.success('Sepet temizlendi', {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto pt-16 pb-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-400">&gt;</span>
            <span className="text-gray-900">Shopping Cart</span>
          </nav>
        </div>

        {/* Empty Cart */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-24 w-24 text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sepetiniz Boş</h2>
            <p className="text-gray-600 mb-8">Henüz sepetinize ürün eklememişsiniz.</p>
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Alışverişe Başla
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto pt-16 pb-8">
        <nav className="flex items-center space-x-2 text-sm">
          <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="text-gray-400">&gt;</span>
          <span className="text-gray-900">Shopping Cart</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Alışveriş Sepeti</h1>
            <p className="text-gray-600 mt-1">{cart.length} ürün</p>
          </div>
          <button
            onClick={handleClearCart}
            className="flex items-center px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Sepeti Temizle
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Table Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      checked={selectAll && cart.every(item => item.checked)}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      aria-label="Tüm ürünleri seç"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">
                      Tümünü Seç
                    </label>
                  </div>
                  <div className="grid grid-cols-6 gap-4 flex-1">
                    <div className="col-span-3">
                      <span className="text-sm font-medium text-gray-700">Ürün</span>
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-medium text-gray-700">Fiyat</span>
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-medium text-gray-700">Adet</span>
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-medium text-gray-700">Toplam</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-200">
                {cart.map((item) => {
                  const itemTotal = item.product.price * item.count;
                  
                  return (
                    <div key={item.product.id} className="p-6">
                      <div className="flex items-center">
                        {/* Checkbox */}
                        <div className="flex items-center mr-4">
                          <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => handleToggleCheck(item.product.id)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            aria-label={`${item.product.name} ürününü seç`}
                          />
                        </div>

                        <div className="grid grid-cols-6 gap-4 flex-1 items-center">
                          {/* Product Info */}
                          <div className="col-span-3 flex items-center space-x-4">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={item.product.images && item.product.images.length > 0 
                                  ? item.product.images[0].url 
                                  : `https://picsum.photos/200/200?random=${item.product.id}`
                                }
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm md:text-lg font-medium text-gray-900 truncate">
                                {item.product.name}
                              </h3>
                              <p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-2 hidden md:block">
                                {item.product.description}
                              </p>
                              {item.product.color && (
                                <div className="flex items-center mt-2">
                                  <span className="text-xs text-gray-500 mr-2">Renk:</span>
                                  <div 
                                    className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-gray-300"
                                    style={{ backgroundColor: item.product.color.toLowerCase() }}
                                  ></div>
                                  <span className="text-xs text-gray-600 ml-1 capitalize">
                                    {item.product.color}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-center">
                            <span className="text-sm md:text-lg font-medium text-gray-900">
                              {item.product.price} TL
                            </span>
                          </div>

                          {/* Quantity */}
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-1 md:space-x-2">
                              <button
                                onClick={() => handleQuantityChange(item.product.id, item.count - 1)}
                                disabled={item.count <= 1}
                                className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Minus className="w-3 h-3 md:w-4 md:h-4" />
                              </button>
                              <span className="w-6 md:w-8 text-center font-medium text-sm md:text-base">{item.count}</span>
                              <button
                                onClick={() => handleQuantityChange(item.product.id, item.count + 1)}
                                disabled={item.count >= item.product.stock}
                                className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Plus className="w-3 h-3 md:w-4 md:h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Total */}
                          <div className="text-center">
                            <span className="text-sm md:text-lg font-bold text-gray-900">
                              {itemTotal.toFixed(2)} TL
                            </span>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                          className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24">
              {/* Header */}
              <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg">
                <h2 className="text-lg font-semibold">Sipariş Özeti</h2>
              </div>
              
              <div className="p-6">
                {/* Product Count Info */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Ürünün Toplamı:</span>
                    <span className="font-medium">{totalPrice.toFixed(2)} TL</span>
                  </div>
                  
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Kargo Toplamı:</span>
                    <span className="font-medium">29,99 TL</span>
                  </div>
                  
                  {/* Discount Section */}
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">150 TL ve Üzeri Kargo</span>
                    <span className="font-medium text-red-500">-29,99 TL</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    Bedava (Satıcı Karşılar)
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900">Toplam</span>
                    <span className="text-blue-600">{totalPrice.toFixed(2)} TL</span>
                  </div>
                </div>

                {/* Discount Code Section */}
                <div className="mb-6">
                  <button className="w-full flex items-center justify-center gap-2 text-blue-600 border border-blue-200 bg-blue-50 py-3 px-4 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                    <span className="text-lg">+</span>
                    İNDİRİM KODU GİR
                  </button>
                </div>

                {/* Create Order Button */}
                <div className="space-y-3">
                  <button
                    disabled={selectedItems.length === 0}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 px-4 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-md"
                    onClick={() => {
                      // TODO: Implement create order functionality
                      toast.info('Sipariş oluşturma özelliği henüz hazır değil!', {
                        position: "top-right",
                        autoClose: 3000,
                      });
                    }}
                  >
                    Sepeti Onayla &gt;
                  </button>
                  
                  <Link
                    to="/shop"
                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center block"
                  >
                    Alışverişe Devam Et
                  </Link>
                </div>

                {/* Info Message */}
                {selectedItems.length === 0 && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-800">
                      Sepetindeki Ürünleri Bireysel Veya Kurumsal Fatura Seçerek Alabilirsin.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
