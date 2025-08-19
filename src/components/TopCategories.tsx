/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../store/types';
import { fetchCategories } from '../store/actions/thunkActions';
import type { Dispatch } from 'redux';

const TopCategories: React.FC = () => {
  const dispatch = useDispatch() as Dispatch;
  const categories = useSelector((state: RootState) => state.product.categories);

  useEffect(() => {
    (dispatch as any)(fetchCategories());
  }, [dispatch]);

  // Get top 5 categories by rating
  const topCategories = [...categories]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  if (!topCategories.length) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 tracking-tight">
          EDITOR'S PICK
        </h2>
        <p className="text-gray-500">
          Problems trying to resolve the conflict between
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 max-w-5xl mx-auto">
        {/* Left large image - First category */}
        {topCategories[0] && (
          <div className="flex-1 flex flex-col hover:scale-105 transition-transform duration-300">
            <Link 
              to={`/shop/${topCategories[0].gender}/${topCategories[0].title}/${topCategories[0].id}`}
              className="relative h-[58vh] w-[90vw] md:w-full mx-auto md:mx-0 overflow-hidden rounded-lg"
            >
              <img 
                src={topCategories[0].img || "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"} 
                alt={topCategories[0].title} 
                className="object-cover w-full h-full" 
              />
              <span className="absolute bottom-6 left-6 bg-white px-6 py-2 font-bold text-lg rounded shadow uppercase">
                {topCategories[0].title}
              </span>
            </Link>
          </div>
        )}
        
        {/* Right grid - Next 4 categories */}
        <div className="flex-[1.2] grid grid-cols-2 grid-rows-2 gap-6 min-w-[200px] md:min-w-[300px]">
          {topCategories.slice(1, 5).map((category, index) => (
            <Link
              key={category.id}
              to={`/shop/${category.gender}/${category.title}/${category.id}`}
              className="relative h-[190px] md:h-[190px] w-[40vw] md:w-full mx-auto md:mx-0 overflow-hidden rounded-lg hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <img 
                src={category.img || `https://images.unsplash.com/photo-${1517841905240 + index}?auto=format&fit=crop&w=400&q=80`} 
                alt={category.title} 
                className="object-cover w-full h-full" 
              />
              <span className="absolute bottom-6 left-6 bg-white px-6 py-2 font-bold text-lg rounded shadow uppercase">
                {category.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
