// Export store
export { store } from './store';

// Export all action creators
export * from './actions/clientActions';
export * from './actions/productActions';
export * from './actions/shoppingCartActions';
export * from './actions/thunkActions';

// Export types
export type { RootState, ClientState, ProductState, ShoppingCartState } from './types';

// Export action types (if needed)
export * from './actionTypes';
