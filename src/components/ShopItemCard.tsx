import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { generateProductUrl } from "../utils/urlUtils";

export interface ShopItem {
  id: number;
  name: string;
  department: string;
  price: string;
  salePrice: string;
  colors: string[];
  image: string;
  category_id?: number; // Add this to link product to category
}

interface ShopItemCardProps {
  product: ShopItem;
  view: 'grid' | 'list';
  gender?: string;
  categoryName?: string;
  categoryId?: string;
}

const ShopItemCard: React.FC<ShopItemCardProps> = ({ product, view, gender, categoryName, categoryId }) => {
  const { categories } = useSelector((state: RootState) => state.product);
  
  // If gender/category info is not provided via props, try to find it from the product's category_id
  let finalGender = gender;
  let finalCategoryName = categoryName;
  let finalCategoryId = categoryId;
  
  if ((!gender || !categoryName || !categoryId) && product.category_id && categories.length > 0) {
    const productCategory = categories.find(cat => cat.id === product.category_id);
    if (productCategory) {
      finalGender = productCategory.gender;
      finalCategoryName = productCategory.title;
      finalCategoryId = productCategory.id.toString();
    }
  }
  
  const productUrl = generateProductUrl(finalGender, finalCategoryName, finalCategoryId, product.name, product.id);

  if (view === 'list') {
    return (
      <Link 
        to={productUrl} 
        className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row items-center w-[85vw] gap-4 h-[20vh] hover:shadow-lg hover:scale-105 transition-all duration-200"
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-32 h-32 object-cover rounded mb-4 md:mb-0" 
        />
        <div className="flex-1 flex flex-col items-center md:items-start">
          <div className="font-bold text-gray-800 text-base mb-1">{product.name}</div>
          <div className="text-gray-500 text-xs mb-2">{product.department}</div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-400 line-through text-sm">{product.price}</span>
            <span className="text-green-600 font-bold text-sm">{product.salePrice}</span>
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link 
      to={productUrl} 
      className="bg-white rounded-lg shadow p-4 flex flex-col items-center h-[70vh] hover:shadow-lg hover:scale-105 transition-all duration-200"
    >
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-[50vh] object-cover rounded mb-4" 
      />
      <div className="flex-1 flex flex-col justify-between w-full">
        <div className="text-center">
          <div className="font-bold text-gray-800 text-base mb-2">{product.name}</div>
          <div className="text-gray-500 text-xs mb-3">{product.department}</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-gray-400 line-through text-sm">{product.price}</span>
            <span className="text-green-600 font-bold text-sm">{product.salePrice}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ShopItemCard;
