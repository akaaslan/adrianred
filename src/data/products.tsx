export interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
  productImage: string;
  department: string;
  sales: number;
  oldPrice: string;
  newPrice: string;
  colors: string[];
  features: string[];
  featureDesc: string;
}

export const products: Product[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    title: "MOST POPULAR",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    productImage: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    department: "English Department",
    sales: 15,
    oldPrice: "$16.48",
    newPrice: "$6.48",
    colors: ["bg-cyan-400", "bg-orange-400", "bg-blue-400", "bg-red-400"],
    features: ["Easy to use", "Ergonomic", "Durable", "Lightweight"],
    featureDesc: "Things on a very small that you have any direct",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    title: "NEW ARRIVAL",
    description: "Designed for modern workspaces and creative minds.",
    productImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    department: "Design Department",
    sales: 8,
    oldPrice: "$22.99",
    newPrice: "$12.99",
    colors: ["bg-green-400", "bg-yellow-400", "bg-purple-400", "bg-pink-400"],
    features: ["Creative", "Modern", "Flexible", "Affordable"],
    featureDesc: "Perfect for creative professionals and students.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    title: "BEST VALUE",
    description: "Get the best value for your money with this product.",
    productImage: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    department: "Sales Department",
    sales: 23,
    oldPrice: "$30.00",
    newPrice: "$19.99",
    colors: ["bg-blue-400", "bg-red-400", "bg-gray-400", "bg-orange-400"],
    features: ["Value", "Reliable", "Popular", "Trusted"],
    featureDesc: "A favorite among our loyal customers.",
  },
];
