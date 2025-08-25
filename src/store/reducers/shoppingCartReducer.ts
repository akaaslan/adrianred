import {
  SET_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_COUNT,
  TOGGLE_CART_ITEM_CHECK,
  CLEAR_CART,
  SET_PAYMENT,
  SET_ADDRESS
} from '../actionTypes';
import type { ShoppingCartState, CartItem, Product } from '../types';

const initialState: ShoppingCartState = {
  cart: [],
  payment: {},
  address: {}
};

interface SetCartAction {
  type: typeof SET_CART;
  payload: CartItem[];
}

interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: Product;
}

interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: number;
}

interface UpdateCartItemCountAction {
  type: typeof UPDATE_CART_ITEM_COUNT;
  payload: { productId: number; count: number };
}

interface ToggleCartItemCheckAction {
  type: typeof TOGGLE_CART_ITEM_CHECK;
  payload: number;
}

interface ClearCartAction {
  type: typeof CLEAR_CART;
}

interface SetPaymentAction {
  type: typeof SET_PAYMENT;
  payload: unknown;
}

interface SetAddressAction {
  type: typeof SET_ADDRESS;
  payload: unknown;
}

type ShoppingCartAction = 
  | SetCartAction
  | AddToCartAction
  | RemoveFromCartAction
  | UpdateCartItemCountAction
  | ToggleCartItemCheckAction
  | ClearCartAction
  | SetPaymentAction
  | SetAddressAction;

const shoppingCartReducer = (state = initialState, action: ShoppingCartAction) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: action.payload
      };

    case ADD_TO_CART: {
      const product: Product = action.payload;
      const existingItemIndex = state.cart.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Product already exists, increase count
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          count: updatedCart[existingItemIndex].count + 1
        };
        return {
          ...state,
          cart: updatedCart
        };
      } else {
        // New product, add to cart
        const newCartItem: CartItem = {
          count: 1,
          checked: true,
          product: product
        };
        return {
          ...state,
          cart: [...state.cart, newCartItem]
        };
      }
    }

    case REMOVE_FROM_CART: {
      const productId: number = action.payload;
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== productId)
      };
    }

    case UPDATE_CART_ITEM_COUNT: {
      const { productId, count } = action.payload;
      if (count <= 0) {
        // Remove item if count is 0 or less
        return {
          ...state,
          cart: state.cart.filter(item => item.product.id !== productId)
        };
      }
      
      const updatedCart = state.cart.map(item =>
        item.product.id === productId
          ? { ...item, count: count }
          : item
      );
      return {
        ...state,
        cart: updatedCart
      };
    }

    case TOGGLE_CART_ITEM_CHECK: {
      const productId: number = action.payload;
      const updatedCart = state.cart.map(item =>
        item.product.id === productId
          ? { ...item, checked: !item.checked }
          : item
      );
      return {
        ...state,
        cart: updatedCart
      };
    }

    case CLEAR_CART:
      return {
        ...state,
        cart: []
      };
    
    case SET_PAYMENT:
      return {
        ...state,
        payment: action.payload
      };
    
    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload
      };
    
    default:
      return state;
  }
};

export default shoppingCartReducer;
