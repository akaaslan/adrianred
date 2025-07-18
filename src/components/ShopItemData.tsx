export interface ShopItem {
  id: number;
  name: string;
  department: string;
  price: string;
  salePrice: string;
  colors: string[];
  image: string;
}

function getRandomPrice(min = 5, max = 100) {
  const price = Math.random() * (max - min) + min;
  return price.toFixed(2);
}

const shopItems: ShopItem[] = Array.from({ length: 32 }, (_, i) => {
  const price = parseFloat(getRandomPrice());
  const salePrice = (price * (Math.random() * 0.5 + 0.3)).toFixed(2);

  return {
    id: i + 1,
    name: "Fashion Item",
    department: "Clothing",
    price: `$${price.toFixed(2)}`,
    salePrice: `$${salePrice}`,
    colors: ["#00BFFF", "#00C49A", "#FFBB28", "#FF8042"],
    image: `https://picsum.photos/seed/clothes${i + 1}/400/400?blur=1`,
  };
});

export default shopItems;
