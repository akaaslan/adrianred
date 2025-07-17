import React from "react";

export type FeaturedProduct = {
  id: number;
  image: string;
  title: string;
  department: string;
  oldPrice: string;
  newPrice: string;
  colors: string[];
};

interface FeaturedCardProps {
  product: FeaturedProduct;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ product }) => {
  return (
    <div className="flex flex-col items-center p-4">
      <img
        src={product.image}
        alt={product.title}
        className="w-48 h-64 object-cover rounded-lg mb-4"
      />
      <div className="font-semibold text-base">{product.title}</div>
      <div className="text-sm text-gray-500 mb-1">{product.department}</div>
      <div className="mb-2">
        <span className="text-gray-400 line-through mr-2">{product.oldPrice}</span>
        <span className="text-green-600 font-bold">{product.newPrice}</span>
      </div>
      <div className="flex gap-2">
        {product.colors.map((color, idx) => (
          <span
            key={idx}
            className="w-4 h-4 rounded-full border border-gray-200"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCard;
