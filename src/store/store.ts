import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
// @ts-expect-error - redux-logger types not available
import logger from 'redux-logger';
import rootReducer from './reducers/rootReducer';

// Create middleware array
const middleware = [thunk];

// Add logger only in development (simple check)
const isDevelopment = typeof window !== 'undefined' && window.location?.hostname === 'localhost';
if (isDevelopment) {
  middleware.push(logger);
}

// Create store with middleware
export const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

export default store;
