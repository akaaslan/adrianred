import React from "react";

const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-90">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
      <span className="text-lg font-semibold text-blue-600">Loading...</span>
    </div>
  );
};

export default PageLoader;
