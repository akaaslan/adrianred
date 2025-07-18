import ProductCard from "./ProductCard";
import { products } from "../data/products";
import type { Product } from "../data/products";

export default function ProductList() {
  return (
    <div className="flex flex-col gap-12 items-center">
      {products.map((product: Product) => (
        <ProductCard key={product.id} {...product} reverse={Math.random() > 0.5} />
      ))}
    </div>
  );
}
