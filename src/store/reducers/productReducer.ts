import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER,
  SET_PRODUCTS_LOADING,
  SET_CURRENT_PRODUCT,
  SET_PRODUCT_LOADING,
  FETCH_STATES
} from '../actionTypes';

const initialState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 25,
  offset: 0,
  filter: '',
  fetchState: FETCH_STATES.NOT_FETCHED,
  productsLoading: false,
  // Product detail state
  currentProduct: null,
  productLoading: false
};

type ProductPayload =
  | string
  | number
  | string[]
  | Record<string, unknown>
  | typeof FETCH_STATES[keyof typeof FETCH_STATES];

interface ProductAction {
  type: string;
  payload?: ProductPayload;
}

const productReducer = (state = initialState, action: ProductAction) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    
    case SET_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload
      };
    
    case SET_TOTAL:
      return {
        ...state,
        total: action.payload
      };
    
    case SET_FETCH_STATE:
      return {
        ...state,
        fetchState: action.payload
      };
    
    case SET_LIMIT:
      return {
        ...state,
        limit: action.payload
      };
    
    case SET_OFFSET:
      return {
        ...state,
        offset: action.payload
      };
    
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    
    case SET_PRODUCTS_LOADING:
      return {
        ...state,
        productsLoading: action.payload
      };
    
    case SET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: action.payload
      };
    
    case SET_PRODUCT_LOADING:
      return {
        ...state,
        productLoading: action.payload
      };
    
    default:
      return state;
  }
};

export default productReducer;
