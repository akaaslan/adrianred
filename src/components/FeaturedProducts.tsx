import React from "react";
import featuredProducts from "../data/FeaturedData";
import FeaturedCard from "./FeaturedCard";

const FeaturedProducts: React.FC = () => {
  return (
    <section className="py-12">
      <div className="text-center mb-6">
        <div className="text-gray-500 text-lg mb-1">Featured Products</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">BESTSELLER PRODUCTS</h2>
        <div className="text-gray-400 text-sm">Problems trying to resolve the conflict between</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {featuredProducts.map((product) => (
          <FeaturedCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
