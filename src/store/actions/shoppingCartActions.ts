import {
  SET_CART,
  SET_PAYMENT,
  SET_ADDRESS
} from '../actionTypes';

// Action Creators - Shopping Cart
export const setCart = (cart: unknown[]) => ({
  type: SET_CART,
  payload: cart
});

export const setPayment = (payment: unknown) => ({
  type: SET_PAYMENT,
  payload: payment
});

export const setAddress = (address: unknown) => ({
  type: SET_ADDRESS,
  payload: address
});
