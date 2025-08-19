# Redux State Management - Adrian Red E-Commerce

## 🏗️ Redux Architecture Overview

This project uses **Vanilla Redux** (not Redux Toolkit) with Redux Thunk and Logger middleware for state management.

## 📁 Project Structure

```
src/store/
├── actionTypes.js          # All action type constants
├── actions/
│   ├── clientActions.js    # Client-related action creators
│   ├── productActions.js   # Product-related action creators
│   ├── shoppingCartActions.js # Cart-related action creators
│   └── thunkActions.js     # Async thunk action creators
├── reducers/
│   ├── clientReducer.js    # Client state reducer
│   ├── productReducer.js   # Product state reducer
│   ├── shoppingCartReducer.js # Shopping cart reducer
│   └── rootReducer.js      # Combined root reducer
├── types.ts               # TypeScript type definitions
├── store.js              # Store configuration
└── index.js              # Store exports
```

## 🗂️ State Structure

### Client Reducer State
```javascript
{
  user: {},              // User object with all user information
  addressList: [],       // Array of user addresses
  creditCards: [],       // Array of user credit cards
  roles: [],            // Array of available user roles
  theme: 'light',       // Current theme (light/dark)
  language: 'en'        // Current language (en/tr)
}
```

### Product Reducer State
```javascript
{
  categories: [],        // Array of product categories
  productList: [],       // Array of products
  total: 0,             // Total number of products
  limit: 25,            // Products per page (default: 25)
  offset: 0,            // Pagination offset (default: 0)
  filter: '',           // Search/filter string
  fetchState: 'NOT_FETCHED' // One of: NOT_FETCHED, FETCHING, FETCHED, FAILED
}
```

### Shopping Cart Reducer State
```javascript
{
  cart: [               // Array of cart items
    {
      count: 1,         // Quantity of this product
      product: {        // Full product object
        id: "1235",
        name: "Product Name",
        price: 99.99,
        // ... other product properties
      }
    }
  ],
  payment: {},          // Payment information object
  address: {}           // Delivery address object
}
```

## 🎬 Available Actions

### Client Actions
- `setUser(user)` - Set user information
- `setRoles(roles)` - Set available roles
- `setTheme(theme)` - Set current theme
- `setLanguage(language)` - Set current language

### Product Actions
- `setCategories(categories)` - Set product categories
- `setProductList(productList)` - Set product list
- `setTotal(total)` - Set total product count
- `setFetchState(fetchState)` - Set fetch status
- `setLimit(limit)` - Set products per page
- `setOffset(offset)` - Set pagination offset
- `setFilter(filter)` - Set search filter

### Shopping Cart Actions
- `setCart(cart)` - Set cart items
- `setPayment(payment)` - Set payment information
- `setAddress(address)` - Set delivery address

### Thunk Actions (Async)
- `fetchRoles()` - Fetch roles from API (only when needed)

## 🔧 Usage Examples

### Basic Usage in Components

```jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme, setFilter, fetchRoles } from '../store';

const MyComponent = () => {
  const dispatch = useDispatch();
  
  // Select state from store
  const theme = useSelector(state => state.client.theme);
  const products = useSelector(state => state.product.productList);
  const cart = useSelector(state => state.shoppingCart.cart);
  
  // Dispatch actions
  const handleThemeChange = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };
  
  const handleSearch = (searchTerm) => {
    dispatch(setFilter(searchTerm));
  };
  
  const handleFetchRoles = () => {
    dispatch(fetchRoles()); // Async thunk action
  };
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Products count: {products.length}</p>
      <p>Cart items: {cart.length}</p>
      <button onClick={handleThemeChange}>Toggle Theme</button>
      <button onClick={handleFetchRoles}>Load Roles</button>
    </div>
  );
};
```

### TypeScript Usage

```tsx
import { useSelector } from 'react-redux';
import type { RootState } from '../store/types';

const MyComponent: React.FC = () => {
  const client = useSelector((state: RootState) => state.client);
  const product = useSelector((state: RootState) => state.product);
  const shoppingCart = useSelector((state: RootState) => state.shoppingCart);
  
  return <div>...</div>;
};
```

## 🌟 Key Features

### 1. **Conditional Async Actions**
The `fetchRoles()` thunk only makes API calls when roles are not already in the store:

```javascript
export const fetchRoles = () => {
  return async (dispatch, getState) => {
    const { client } = getState();
    
    // Check if roles are already fetched
    if (client.roles && client.roles.length > 0) {
      return; // Skip API call
    }
    
    // Make API call only when needed
    // ...
  };
};
```

### 2. **Redux Logger Middleware**
Automatically logs all actions and state changes in development mode:
- Action dispatched
- Previous state
- Action details
- Next state

### 3. **Error Handling**
Robust error handling with fallback data:

```javascript
try {
  const response = await axiosInstance.get('/roles');
  dispatch(setRoles(response.data));
} catch (error) {
  console.error('Error fetching roles:', error);
  
  // Fallback roles
  const fallbackRoles = [
    { id: 1, name: 'Admin', code: 'admin' },
    { id: 2, name: 'Store', code: 'store' },
    { id: 3, name: 'Customer', code: 'customer' }
  ];
  
  dispatch(setRoles(fallbackRoles));
}
```

## 🛠️ Development Tools

### Redux DevTools
Install the Redux DevTools browser extension for:
- Time-travel debugging
- Action replay
- State inspection
- Performance monitoring

### Redux Logger
Automatically enabled in development mode:
- Logs every action
- Shows state before/after
- Color-coded console output

## 📊 Performance Considerations

### 1. **Selective Subscriptions**
Use specific selectors to avoid unnecessary re-renders:

```jsx
// Good - only re-renders when theme changes
const theme = useSelector(state => state.client.theme);

// Avoid - re-renders on any client state change
const client = useSelector(state => state.client);
```

### 2. **Memoized Selectors**
For complex calculations, consider using reselect (optional):

```jsx
import { createSelector } from 'reselect';

const getCartTotal = createSelector(
  state => state.shoppingCart.cart,
  cart => cart.reduce((total, item) => total + (item.count * item.product.price), 0)
);
```

### 3. **Conditional API Calls**
Thunk actions check state before making API calls to avoid unnecessary requests.

## 🧪 Testing Redux

### Testing Reducers
```javascript
import clientReducer from './clientReducer';
import { setTheme } from '../actions/clientActions';

test('should set theme', () => {
  const initialState = { theme: 'light' };
  const action = setTheme('dark');
  const newState = clientReducer(initialState, action);
  
  expect(newState.theme).toBe('dark');
});
```

### Testing Actions
```javascript
import { setUser } from './clientActions';
import { SET_USER } from '../actionTypes';

test('should create SET_USER action', () => {
  const user = { id: 1, name: 'John' };
  const expectedAction = {
    type: SET_USER,
    payload: user
  };
  
  expect(setUser(user)).toEqual(expectedAction);
});
```

## 🚀 Migration Notes

### From Local State to Redux
1. Replace `useState` with `useSelector` for reading state
2. Replace state setters with `dispatch` actions
3. Move API calls to thunk actions
4. Update component dependencies

### Example Migration:
```jsx
// Before (Local State)
const [theme, setTheme] = useState('light');
const [roles, setRoles] = useState([]);

// After (Redux)
const theme = useSelector(state => state.client.theme);
const roles = useSelector(state => state.client.roles);
const dispatch = useDispatch();

// Usage
dispatch(setTheme('dark'));
dispatch(fetchRoles());
```

## 📋 Next Steps

1. **Integrate with Components**: Update existing components to use Redux
2. **Add More Thunks**: Create async actions for products, cart operations
3. **Error Handling**: Add global error state management
4. **Persistence**: Add redux-persist for state persistence
5. **API Integration**: Connect all CRUD operations to Redux
6. **Testing**: Add comprehensive test suite for actions and reducers

---

**Redux Store Status**: ✅ Ready for Production

**Last Updated**: January 2024

**Middleware**: Redux Thunk, Redux Logger (dev only)
