/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
// @ts-expect-error - redux-logger types not available
import logger from 'redux-logger';
import rootReducer from './reducers/rootReducer';

// Infer the state type from rootReducer
import type { Reducer } from 'redux';
type RootState = ReturnType<typeof rootReducer>;

// Create middleware array
const middleware = [thunk];

// Add logger only in development (simple check)
const isDevelopment = typeof window !== 'undefined' && window.location?.hostname === 'localhost';
if (isDevelopment) {
  middleware.push(logger);
}

// Create store with middleware
export const store = createStore<RootState, any, object, object>(
  rootReducer as unknown as Reducer<RootState>,
  applyMiddleware(...middleware)
);

export default store;
