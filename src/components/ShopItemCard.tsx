import React from "react";
import { Link } from "react-router-dom";

export interface ShopItem {
  id: number;
  name: string;
  department: string;
  price: string;
  salePrice: string;
  colors: string[];
  image: string;
}

const ShopItemCard: React.FC<{ product: ShopItem; view: 'grid' | 'list' }> = ({ product, view }) => {
  if (view === 'list') {
    return (
      <Link to={`/product/${product.id}`} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row items-center w-[85vw] gap-4 h-[20vh] hover:shadow-lg hover:scale-105 transition-all duration-200">
        <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded mb-4 md:mb-0" />
        <div className="flex-1 flex flex-col items-center md:items-start">
          <div className="font-bold text-gray-800 text-base mb-1">{product.name}</div>
          <div className="text-gray-500 text-xs mb-2">{product.department}</div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-400 line-through text-sm">{product.price}</span>
            <span className="text-green-600 font-bold text-sm">{product.salePrice}</span>
          </div>
          <div className="flex gap-2 mt-auto">
            {product.colors.map((color, i) => (
              <span key={i} className="w-3 h-3 rounded-full" style={{ background: color, display: 'inline-block' }}></span>
            ))}
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link to={`/product/${product.id}`} className="bg-white rounded-lg shadow p-4 flex flex-col items-center h-[60vh] hover:shadow-lg hover:scale-105 transition-all duration-200">
      <img src={product.image} alt={product.name} className="w-full h-[50vh] object-cover rounded mb-4" />
      <div className="font-bold text-gray-800 text-base mb-1">{product.name}</div>
      <div className="text-gray-500 text-xs mb-2">{product.department}</div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-gray-400 line-through text-sm">{product.price}</span>
        <span className="text-green-600 font-bold text-sm">{product.salePrice}</span>
      </div>
      <div className="flex gap-2 mt-auto">
        {product.colors.map((color, i) => (
          <span key={i} className="w-3 h-3 rounded-full" style={{ background: color, display: 'inline-block' }}></span>
        ))}
      </div>
    </Link>
  );
};

export default ShopItemCard;
