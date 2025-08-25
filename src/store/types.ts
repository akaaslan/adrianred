/* eslint-disable @typescript-eslint/no-explicit-any */
// Category Interface
export interface Category {
  id: number;
  title: string;
  gender: string;
  rating: number;
  img?: string;
}

// Product Interface
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  store_id: number;
  category_id: number;
  rating: number;
  sell_count: number;
  color: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}

// Redux State Types
export interface ClientState {
  user: any;
  addressList: any[];
  creditCards: any[];
  roles: any[];
  theme: string;
  language: string;
  loginLoading: boolean;
  loginError: string | null;
}

export interface ProductState {
  categories: Category[];
  productList: Product[];
  total: number;
  limit: number;
  offset: number;
  filter: string;
  fetchState: string;
  productsLoading: boolean;
  // Individual product detail state
  currentProduct: Product | null;
  productLoading: boolean;
}

export interface CartItem {
  count: number;
  checked: boolean;
  product: Product;
}

export interface ShoppingCartState {
  cart: CartItem[];
  payment: any;
  address: any;
}

export interface RootState {
  client: ClientState;
  product: ProductState;
  shoppingCart: ShoppingCartState;
}
