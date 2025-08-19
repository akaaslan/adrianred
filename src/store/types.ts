/* eslint-disable @typescript-eslint/no-explicit-any */
// Category Interface
export interface Category {
  id: number;
  title: string;
  gender: string;
  rating: number;
  img?: string;
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
  productList: any[];
  total: number;
  limit: number;
  offset: number;
  filter: string;
  fetchState: string;
}

export interface ShoppingCartState {
  cart: any[];
  payment: any;
  address: any;
}

export interface RootState {
  client: ClientState;
  product: ProductState;
  shoppingCart: ShoppingCartState;
}
