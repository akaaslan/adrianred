import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import ShopItemCard from "./ShopItemCard";

export interface ShopItem {
  id: number;
  name: string;
  department: string;
  price: string;
  salePrice: string;
  colors: string[];
  image: string;
  category_id?: number;
}

interface ShopItemListProps {
  gender?: string;
  categoryName?: string;
  categoryId?: string;
}

const ShopItemList: React.FC<ShopItemListProps> = ({ gender, categoryName, categoryId }) => {
  const { productList, total, productsLoading } = useSelector((state: RootState) => state.product);
  
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Remove automatic fetching - this will be handled by ShopPage
  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);

  // Transform Product data to ShopItem format
  const transformedProducts: ShopItem[] = React.useMemo(() => {
    const productNames = [
      'Siyah %100 Pamuk Bluz',
      'Beyaz %100 Pamuk Gömlek', 
      'Çocuk Kırmızı Türk Bayraklı Tişört',
      'Unisex Çocuk Atatürk Tişört',
      'Kadın Siyah Klasik Ayakkabı',
      'Erkek Denim Pantolon',
      'Çocuk Renkli Kazak',
      'Kadın Beyaz Bluz',
      'Erkek Siyah Polo Tişört',
      'Çocuk Mavi Elbise',
      'Kadın Kırmızı Etek',
      'Erkek Gri Kazak'
    ];
    
    const departments = ['Fashion', 'Clothing', 'Apparel', 'Style', 'Wear'];
    
    return productList.map((product, index) => ({
      id: product.id,
      name: productNames[index % productNames.length] || product.name,
      department: departments[index % departments.length],
      price: `$${(product.price * 1.2).toFixed(2)}`, // Show original price as higher
      salePrice: `$${product.price.toFixed(2)}`,
      colors: [product.color || '#00BFFF'],
      image: product.images?.[0]?.url || `https://picsum.photos/400/400?random=${product.id + 500}`,
      category_id: product.category_id
    }));
  }, [productList]);

  // Use transformed products directly (no pagination needed - handled by API)
  const products = transformedProducts;

  return (
    <div ref={containerRef} className="bg-white w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto py-8 flex flex-col items-center">
      {/* Loading Spinner */}
      {productsLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
          <span className="ml-4 text-gray-600 text-lg">Loading products...</span>
        </div>
      )}

      {/* Content - only show when not loading */}
      {!productsLoading && (
        <>
          {/* Top bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-[21vw]">
            <div className="text-gray-600 text-sm">
              Showing {products.length} results {total > 0 && `(${total} total products)`}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm">View:</span>
              <button
                className={`w-8 h-8 flex items-center justify-center border rounded ${view === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'} mr-1`}
                title="Grid view"
                onClick={() => setView('grid')}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              </button>
              <button
                className={`w-8 h-8 flex items-center justify-center border rounded ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                title="List view"
                onClick={() => setView('list')}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="7"/><rect x="3" y="14" width="18" height="7"/></svg>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`px-4 py-1 rounded text-sm font-semibold ${filter ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`}
                onClick={() => setFilter(f => !f)}
                title="Toggle additional filters"
              >
                Additional Filters
              </button>
            </div>
          </div>

          {/* No products message */}
          {products.length === 0 && (
            <div className="flex justify-center items-center py-20">
              <p className="text-gray-500 text-lg">No products found.</p>
            </div>
          )}

          {/* Product grid/list */}
          {products.length > 0 && (
            <>
              {view === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <ShopItemCard 
                      key={product.id} 
                      product={product} 
                      view="grid" 
                      gender={gender}
                      categoryName={categoryName}
                      categoryId={categoryId}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {products.map((product) => (
                    <ShopItemCard 
                      key={product.id} 
                      product={product} 
                      view="list" 
                      gender={gender}
                      categoryName={categoryName}
                      categoryId={categoryId}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ShopItemList;