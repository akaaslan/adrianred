import React from "react";

export type FeaturedPost = {
  id: number;
  image: string;
  title: string;
  description: string;
  date: string;
  comments: number;
  isNew?: boolean;
};

interface FeaturedPostCardProps {
  post: FeaturedPost;
}

const FeaturedPostCard: React.FC<FeaturedPostCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border flex flex-col overflow-hidden w-full max-w-xs mx-auto hover:scale-105 hover:rotate-[2deg] transition-transform duration-300  ">
      <div className="relative">
        <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
        {post.isNew && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded">NEW</span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2 text-xs text-gray-400 flex gap-2">
          <span className="text-blue-500">Google</span>
          <span>Trending</span>
          <span>New</span>
        </div>
        <h3 className="font-bold text-lg mb-2 leading-tight">{post.title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-1">{post.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1"><svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> {post.date}</span>
          <span className="flex items-center gap-1"><svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12a9 9 0 0 0 18 0A9 9 0 0 0 3 12z"/><path d="M9 12h6"/></svg> {post.comments} comments</span>
        </div>
        <a href="#" className="font-semibold text-gray-700 hover:text-blue-600 flex items-center gap-1">Learn More <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
      </div>
    </div>
  );
};

export default FeaturedPostCard;
