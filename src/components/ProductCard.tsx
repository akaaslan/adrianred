

type ProductCardProps = {
  image: string;
  title: string;
  description: string;
  productImage: string;
  department: string;
  sales: number;
  oldPrice: string | number;
  newPrice: string | number;
  colors: string[];
  features: string[];
  featureDesc: string;
  reverse?: boolean;
};

const ProductCard = ({
  image,
  title,
  description,
  productImage,
  department,
  sales,
  oldPrice,
  newPrice,
  colors,
  features,
  featureDesc,
  reverse = false,
}: ProductCardProps) => {
  return (
    <div className={`w-full min-h-[400px] bg-white flex flex-col md:flex-row items-center justify-center z-40 ${reverse ? 'md:flex-row-reverse' : ''}`}>
      {/* Left image section */}
      <div className="md:w-1/2 w-full h-64 md:h-auto">
        <img src={image} alt="Product" className="object-cover w-full h-full rounded-none-t-lg md:rounded-none" />
      </div>
      {/* Right details section */}
      <div className="md:w-1/2 w-full flex flex-col items-center justify-center py-6 px-4 md:py-8 md:px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">{title}</h2>
        <p className="text-gray-500 text-center mb-4 max-w-md">{description}</p>
        <img src={productImage} alt="Product" className="mx-auto mb-4 w-32 h-24 md:w-48 md:h-32 object-contain" />
        <div className="text-center font-semibold mb-2">{department}</div>
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-2">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/></svg>
          <span>{sales} Sales</span>
        </div>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-gray-400 line-through">{oldPrice}</span>
          <span className="text-green-500 font-bold">{newPrice}</span>
        </div>
        <div className="flex items-center justify-center gap-2 mb-6">
          {colors.map((c, i) => (
            <span key={i} className={`w-4 h-4 rounded-full border ${c}`}></span>
          ))}
        </div>
        {/* Features below */}
        <div className="w-full border-t pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-red-500 font-bold text-2xl mb-1">{i + 1}.</span>
              <span className="font-bold text-sm text-gray-800 mb-1">{f}</span>
              <span className="text-xs text-gray-500 text-center">{featureDesc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
