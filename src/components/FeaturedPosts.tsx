import React from "react";
import FeaturedPostCard from "./FeaturedPostCard";
import featuredPostsData from "../data/FeaturedPostsData";

const FeaturedPosts: React.FC = () => {
  return (
    <section className="py-16 bg-white ">
      <div className="text-center mb-10 ">
        <div className="text-blue-500 font-semibold mb-2">Practice Advice</div>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Featured Posts</h2>
        <div className="text-gray-400 text-base mb-2">Problems trying to resolve the conflict between<br/>the two major realms of Classical physics: Newtonian mechanics</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {featuredPostsData.map(post => (
          <FeaturedPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};



export default FeaturedPosts;
