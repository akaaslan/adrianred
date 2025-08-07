import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import shopItems from '../components/ShopItemData';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const product = shopItems.find(item => item.id === parseInt(id || '1'));
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link to="/shop" className="text-blue-600 hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const images = [
    product.image,
    `https://picsum.photos/seed/clothes${product.id}-2/400/400`,
    `https://picsum.photos/seed/clothes${product.id}-3/400/400`
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pt-24">
        <nav className="flex items-center space-x-2 text-sm">
          <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="text-gray-400">&gt;</span>
          <Link to="/shop" className="text-gray-500 hover:text-gray-700">Shop</Link>
          <span className="text-gray-400">&gt;</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
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
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Image Thumbnails */}
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
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600">{product.department}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">(10 Reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">{product.salePrice}</span>
              <span className="text-xl text-gray-500 line-through">{product.price}</span>
            </div>

            {/* Availability */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900">Availability:</span>
              <span className="text-sm text-green-600 font-medium">In Stock</span>
            </div>

            {/* Description */}
            <div className="border-t pt-6">
              <p className="text-gray-600 text-sm leading-relaxed">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. 
                RELIT official consequent door ENIM RELIT Mollie. Excitation venial 
                consequent sent nostrum met.
              </p>
            </div>

            {/* Color Options */}
            <div className="border-t pt-6">
              <div className="flex items-center space-x-4">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-500"
                    style={{ backgroundColor: color }}
                    title={`Color ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-gray-900 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>
                <button className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                  Select Options
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6.5M7 13l-1.5-6.5m0 0h15.5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
                  </svg>
                </button>
                <button className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16 border-t pt-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center space-x-8 border-b">
              <button className="px-6 py-3 text-sm font-medium text-gray-900 border-b-2 border-blue-500">
                Description
              </button>
              <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
                Additional Information
              </button>
              <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
                Reviews (0)
              </button>
            </div>
            
            <div className="py-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">The quick fox jumps over</h3>
                  <div className="space-y-4 text-sm text-gray-600">
                    <p>
                      Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official 
                      consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                    </p>
                    <p>
                      Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official 
                      consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                    </p>
                    <p>
                      Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official 
                      consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    src={`https://picsum.photos/seed/product-detail/400/300`}
                    alt="Product detail"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bestseller Products */}
        <div className="mt-16 border-t pt-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">BESTSELLER PRODUCTS</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {shopItems.slice(0, 8).map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="group"
              >
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.department}</p>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-sm text-gray-500 line-through">{item.price}</span>
                    <span className="text-sm font-bold text-green-600">{item.salePrice}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
