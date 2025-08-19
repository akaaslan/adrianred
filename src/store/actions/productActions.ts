import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER
} from '../actionTypes';

// Action Creators - Product
export const setCategories = (categories: unknown[]) => ({
  type: SET_CATEGORIES,
  payload: categories
});

export const setProductList = (productList: unknown[]) => ({
  type: SET_PRODUCT_LIST,
  payload: productList
});

export const setTotal = (total: number) => ({
  type: SET_TOTAL,
  payload: total
});

export const setFetchState = (fetchState: string) => ({
  type: SET_FETCH_STATE,
  payload: fetchState
});

export const setLimit = (limit: number) => ({
  type: SET_LIMIT,
  payload: limit
});

export const setOffset = (offset: number) => ({
  type: SET_OFFSET,
  payload: offset
});

export const setFilter = (filter: string) => ({
  type: SET_FILTER,
  payload: filter
});
