// Action Types - Client
export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_ROLES = 'SET_ROLES';
export const SET_THEME = 'SET_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_LOGIN_LOADING = 'SET_LOGIN_LOADING';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

// Action Types - Product
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const SET_TOTAL = 'SET_TOTAL';
export const SET_FETCH_STATE = 'SET_FETCH_STATE';
export const SET_LIMIT = 'SET_LIMIT';
export const SET_OFFSET = 'SET_OFFSET';
export const SET_FILTER = 'SET_FILTER';

// Action Types - Shopping Cart
export const SET_CART = 'SET_CART';
export const SET_PAYMENT = 'SET_PAYMENT';
export const SET_ADDRESS = 'SET_ADDRESS';

// Fetch States
export const FETCH_STATES = {
  NOT_FETCHED: 'NOT_FETCHED',
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  FAILED: 'FAILED'
} as const;
