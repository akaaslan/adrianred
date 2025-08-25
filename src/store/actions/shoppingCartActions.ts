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
import type { Product, CartItem } from '../types';

// Action Creators - Shopping Cart
export const setCart = (cart: CartItem[]) => ({
  type: SET_CART,
  payload: cart
});

export const addToCart = (product: Product) => ({
  type: ADD_TO_CART,
  payload: product
});

export const removeFromCart = (productId: number) => ({
  type: REMOVE_FROM_CART,
  payload: productId
});

export const updateCartItemCount = (productId: number, count: number) => ({
  type: UPDATE_CART_ITEM_COUNT,
  payload: { productId, count }
});

export const toggleCartItemCheck = (productId: number) => ({
  type: TOGGLE_CART_ITEM_CHECK,
  payload: productId
});

export const clearCart = () => ({
  type: CLEAR_CART
});

export const setPayment = (payment: unknown) => ({
  type: SET_PAYMENT,
  payload: payment
});

export const setAddress = (address: unknown) => ({
  type: SET_ADDRESS,
  payload: address
});
