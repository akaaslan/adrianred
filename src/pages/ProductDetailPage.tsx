/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../store/actions/thunkActions';
import { addToCart } from '../store/actions/shoppingCartActions';
import { toast } from 'react-toastify';
import type { ThunkDispatch } from 'redux-thunk';
import type { AnyAction } from 'redux';
import type { RootState } from '../store';

interface ProductDetailParams {
  gender?: string;
  categoryName?: string;
  categoryId?: string;
  productNameSlug?: string;
  productId?: string;
}

export default function ProductDetailPage() {
  const { gender, categoryName, categoryId, productNameSlug, productId } = useParams<ProductDetailParams>();
  const history = useHistory();
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const { currentProduct, productLoading } = useSelector((state: RootState) => state.product);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch product when component mounts or productId changes
  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct(productId));
    }
  }, [dispatch, productId]);

  // Reset selected image when product changes
  useEffect(() => {
    setSelectedImage(0);
  }, [currentProduct]);

  const handleBackClick = () => {
    if (gender && categoryName && categoryId) {
      history.push(`/shop/${gender}/${categoryName}/${categoryId}`);
    } else {
      history.push('/shop');
    }
  };

  const handleAddToCart = () => {
    if (currentProduct && currentProduct.stock > 0) {
      // Add the specified quantity to cart
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(currentProduct));
      }
      
      // Show success toast notification
      const message = quantity === 1 
        ? `${currentProduct.name} sepete eklendi! 🛒` 
        : `${quantity} adet ${currentProduct.name} sepete eklendi! 🛒`;
      
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: '#10B981',
          color: '#ffffff',
          fontWeight: '500',
          borderRadius: '12px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        }
      });
      
      // Reset quantity to 1
      setQuantity(1);
    }
  };

  // Loading state
  if (productLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Product not found
  if (!currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button 
            onClick={handleBackClick}
            className="text-blue-600 hover:underline"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const images = currentProduct.images && currentProduct.images.length > 0 
    ? currentProduct.images.map(img => img.url)
    : [`https://picsum.photos/400/400?random=${currentProduct.id}`];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pt-20 sm:pt-24">
        <nav className="flex items-center space-x-2 text-xs sm:text-sm overflow-x-auto whitespace-nowrap">
          <Link to="/" className="text-gray-500 hover:text-gray-700 flex-shrink-0">Home</Link>
          <span className="text-gray-400 flex-shrink-0">&gt;</span>
          <button 
            onClick={handleBackClick}
            className="text-gray-500 hover:text-gray-700 flex-shrink-0"
          >
            Shop
          </button>
          {categoryName && (
            <>
              <span className="text-gray-400 flex-shrink-0">&gt;</span>
              <span className="text-gray-500 capitalize truncate">{categoryName}</span>
            </>
          )}
          <span className="text-gray-400 flex-shrink-0">&gt;</span>
          <span className="text-gray-900 truncate">{currentProduct.name}</span>
        </nav>
        
        {/* Back Button */}
        <div className="mt-4">
          <button
            onClick={handleBackClick}
            className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </button>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={currentProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="flex space-x-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${currentProduct.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{currentProduct.name}</h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                {currentProduct.description}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(currentProduct.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {currentProduct.rating} ({currentProduct.sell_count} reviews)
                </span>
              </div>
            </div>

            {/* Price and Stock */}
            <div className="border-t border-gray-200 pt-4 sm:pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">${currentProduct.price}</span>
                </div>
                <div className="sm:text-right">
                  <div className={`text-sm font-medium ${currentProduct.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {currentProduct.stock > 0 ? `${currentProduct.stock} in stock` : 'Out of stock'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {currentProduct.sell_count} sold
                  </div>
                </div>
              </div>
            </div>            {/* Color and Quantity */}
            <div className="space-y-4">
              {currentProduct.color && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: currentProduct.color.toLowerCase() }}
                      title={currentProduct.color}
                    ></div>
                    <span className="text-sm text-gray-600 capitalize">{currentProduct.color}</span>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3 justify-center sm:justify-start">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 sm:p-3 border border-gray-300 rounded-lg hover:bg-gray-50 touch-manipulation"
                    disabled={quantity <= 1}
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-12 sm:w-16 text-center font-medium text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(currentProduct.stock, quantity + 1))}
                    className="p-2 sm:p-3 border border-gray-300 rounded-lg hover:bg-gray-50 touch-manipulation"
                    disabled={quantity >= currentProduct.stock}
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6">
              <button
                onClick={handleAddToCart}
                disabled={currentProduct.stock === 0}
                className="w-full bg-blue-600 text-white py-3 sm:py-4 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 text-base sm:text-lg touch-manipulation"
              >
                {currentProduct.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 sm:py-4 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 text-base sm:text-lg touch-manipulation">
                Add to Wishlist
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Product Details</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Store ID</dt>
                  <dd className="text-sm font-medium text-gray-900">{currentProduct.store_id}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Category ID</dt>
                  <dd className="text-sm font-medium text-gray-900">{currentProduct.category_id}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Rating</dt>
                  <dd className="text-sm font-medium text-gray-900">{currentProduct.rating}/5</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
