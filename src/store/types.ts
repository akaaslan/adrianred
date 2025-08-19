/* eslint-disable @typescript-eslint/no-explicit-any */
// Redux State Types
export interface ClientState {
  user: any;
  addressList: any[];
  creditCards: any[];
  roles: any[];
  theme: string;
  language: string;
}

export interface ProductState {
  categories: any[];
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
