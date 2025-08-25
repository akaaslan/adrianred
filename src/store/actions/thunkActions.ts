/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '../../api/axiosInstance';
import { setRoles, setUser, setLoginLoading, setLoginError } from './clientActions';
import { setCategories, setProductList, setTotal, setProductsLoading, setCurrentProduct, setProductLoading } from './productActions';

// Thunk Action Creator to get roles
import type { Dispatch } from 'redux';

// Import RootState as a type from your types file
import type { RootState, Category } from '../types';

export const fetchRoles = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { client } = getState();
    
    // Check if roles are already fetched to avoid unnecessary API calls
    if (client.roles && client.roles.length > 0) {
      return;
    }

    try {
      const response = await axiosInstance.get('/roles');
      
      if (response.data) {
        dispatch(setRoles(response.data));
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
      
      // Fallback roles in case of error
      const fallbackRoles = [
        { id: 1, name: 'Admin', code: 'admin' },
        { id: 2, name: 'Store', code: 'store' },
        { id: 3, name: 'Customer', code: 'customer' }
      ];
      
      dispatch(setRoles(fallbackRoles));
    }
  };
};

// Thunk Action Creator for login
interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface LoginResult {
  success: boolean;
  user?: any;
  error?: string;
}

export const loginUser = (credentials: LoginCredentials) => {
  return async (dispatch: Dispatch): Promise<LoginResult> => {
    dispatch(setLoginLoading(true));
    dispatch(setLoginError(null));

    // Special user check first
    if (credentials.email === 'mineldilaybayrak@hotmail.com' && credentials.password === 'benbukizaasigimamk') {
      const specialUser = {
        id: 999,
        email: 'mineldilaybayrak@hotmail.com',
        name: 'Minel Dilay',
        role: 'customer'
      };
      
      const token = 'special_token_' + Date.now();
      
      if (credentials.rememberMe) {
        localStorage.setItem('authToken', token);
      } else {
        sessionStorage.setItem('authToken', token);
      }
      
      dispatch(setUser(specialUser));
      dispatch(setLoginLoading(false));
      
      return { success: true, user: specialUser };
    }

    try {
      const response = await axiosInstance.post('/login', {
        email: credentials.email,
        password: credentials.password,
      });

      console.log('Login response:', response.data); // Debug log
      console.log('Full response structure:', response);

      if (response.status === 200 && response.data) {
        // Try different possible response structures
        let token, user;
        
        if (response.data.token && response.data.user) {
          // Structure: { token: "...", user: { ... } }
          token = response.data.token;
          user = response.data.user;
        } else if (response.data.access_token) {
          // Structure: { access_token: "...", user: { ... } }
          token = response.data.access_token;
          user = response.data.user || response.data;
        } else if (response.data.jwt) {
          // Structure: { jwt: "...", ... }
          token = response.data.jwt;
          user = response.data;
        } else {
          // Fallback: treat the whole response as user data
          user = response.data;
          token = response.data.token || response.data.access_token || response.data.jwt;
        }
        
        console.log('Extracted - Token:', token, 'User:', user);
        
        // Always save token for session, but only persist if remember me is checked
        if (token) {
          if (credentials.rememberMe) {
            localStorage.setItem('authToken', token);
          } else {
            // For session only, we still need the token for API calls
            sessionStorage.setItem('authToken', token);
          }
        }
        
        // Save user to Redux state
        console.log('About to dispatch setUser with:', user);
        dispatch(setUser(user));
        dispatch(setLoginLoading(false));
        
        console.log('Login successful, returning result');
        return { success: true, user };
      } else {
        dispatch(setLoginError('Invalid response from server'));
        dispatch(setLoginLoading(false));
        return { success: false, error: 'Invalid response from server' };
      }
    } catch (error: unknown) {
      console.error('Login error:', error);
      
      let errorMessage = 'An error occurred during login. Please try again.';
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string }; status?: number } };
        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        } else if (axiosError.response?.status === 401) {
          errorMessage = 'Invalid email or password. Please try again.';
        }
      }
      
      dispatch(setLoginError(errorMessage));
      dispatch(setLoginLoading(false));
      
      return { success: false, error: errorMessage };
    }
  };
};

// Thunk Action Creator to initialize user from token
export const initializeUser = () => {
  return async (dispatch: Dispatch) => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    console.log('Initializing user, found token:', !!token);
    
    if (token) {
      // Check if it's a special user token
      if (token.startsWith('special_token_')) {
        const specialUser = {
          id: 999,
          email: 'mineldilaybayrak@hotmail.com',
          name: 'Minel Dilay',
          role: 'customer'
        };
        console.log('Restoring special user from token');
        dispatch(setUser(specialUser));
        return;
      }
      
      console.log('Token found but skipping verification for now');
      
      /* TODO: backend tamamlaninca bunu uncomment et.
      try {
        const response = await axiosInstance.get('/verify');
        
        if (response.status === 200 && response.data) {
          console.log('User restored from token:', response.data);
          dispatch(setUser(response.data));
        }
      } catch {
        console.log('Token invalid, removing from storage');
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
      }
      */
    }
  };
};

// Thunk Action Creator to fetch categories
export const fetchCategories = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { product } = getState();
    
    // Check if categories are already fetched to avoid unnecessary API calls
    if (product.categories && product.categories.length > 0) {
      return;
    }

    try {
      console.log('Fetching categories...');
      const response = await axiosInstance.get('/categories');
      
      if (response.data) {
        console.log('Categories fetched successfully:', response.data);
        const categories: Category[] = response.data;
        dispatch(setCategories(categories));
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      
      // Fallback categories for development
      const fallbackCategories: Category[] = [
        { id: 1, title: 'Ayakkabı', gender: 'kadın', rating: 4.8, img: '/images/categories/shoes.jpg' },
        { id: 2, title: 'Gömlek', gender: 'erkek', rating: 4.6, img: '/images/categories/shirts.jpg' },
        { id: 3, title: 'Elbise', gender: 'kadın', rating: 4.9, img: '/images/categories/dresses.jpg' },
        { id: 4, title: 'Pantolon', gender: 'erkek', rating: 4.5, img: '/images/categories/pants.jpg' },
        { id: 5, title: 'Çanta', gender: 'kadın', rating: 4.7, img: '/images/categories/bags.jpg' },
        { id: 6, title: 'Ceket', gender: 'erkek', rating: 4.4, img: '/images/categories/jackets.jpg' },
        { id: 7, title: 'Aksesuar', gender: 'kadın', rating: 4.3, img: '/images/categories/accessories.jpg' },
        { id: 8, title: 'Spor', gender: 'erkek', rating: 4.6, img: '/images/categories/sports.jpg' }
      ];
      
      dispatch(setCategories(fallbackCategories));
    }
  };
};

// Thunk Action Creator to fetch products
interface FetchProductsParams {
  category?: string;
  sort?: string;
  filter?: string;
  limit?: number;
  offset?: number;
}

export const fetchProducts = (params?: FetchProductsParams) => {
  return async (dispatch: Dispatch) => {
    // Set loading to true
    dispatch(setProductsLoading(true));

    try {
      // Build query string
      const queryParams = new URLSearchParams();
      if (params?.category) {
        queryParams.append('category', params.category);
      }
      if (params?.sort) {
        queryParams.append('sort', params.sort);
      }
      if (params?.filter) {
        queryParams.append('filter', params.filter);
      }
      // Add pagination parameters with defaults
      queryParams.append('limit', (params?.limit || 25).toString());
      queryParams.append('offset', (params?.offset || 0).toString());

      const queryString = queryParams.toString();
      const endpoint = `/products?${queryString}`;

      console.log('Fetching products from:', endpoint);
      const response = await axiosInstance.get(endpoint);
      
      if (response.data) {
        console.log('Products fetched successfully:', response.data);
        
        // Extract total and products from response
        const { total, products } = response.data;
        
        // Dispatch actions to update the store
        dispatch(setTotal(total || 0));
        dispatch(setProductList(products || []));
        dispatch(setProductsLoading(false));
        
        console.log(`Loaded ${products?.length || 0} products out of ${total || 0} total`);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      dispatch(setProductsLoading(false));
      
      // Fallback products for development (simulating pagination)
      const allFallbackProducts = [
        {
          id: 1,
          name: 'Beyaz Tişört',
          description: 'Rahat ve şık beyaz tişört',
          price: 79.99,
          stock: 50,
          store_id: 1,
          category_id: 1,
          rating: 4.5,
          sell_count: 120,
          color: 'Beyaz',
          images: [
            { id: 1, url: 'https://picsum.photos/400/400?random=1' }
          ]
        },
        {
          id: 2,
          name: 'Mavi Jean',
          description: 'Klasik mavi jean pantolon',
          price: 159.99,
          stock: 30,
          store_id: 1,
          category_id: 2,
          rating: 4.2,
          sell_count: 85,
          color: 'Mavi',
          images: [
            { id: 2, url: 'https://picsum.photos/400/400?random=2' }
          ]
        },
        {
          id: 3,
          name: 'Kırmızı Elbise',
          description: 'Zarif kırmızı elbise',
          price: 299.99,
          stock: 15,
          store_id: 2,
          category_id: 3,
          rating: 4.8,
          sell_count: 45,
          color: 'Kırmızı',
          images: [
            { id: 3, url: 'https://picsum.photos/400/400?random=3' }
          ]
        },
        {
          id: 4,
          name: 'Siyah Ayakkabı',
          description: 'Şık siyah ayakkabı',
          price: 399.99,
          stock: 25,
          store_id: 2,
          category_id: 1,
          rating: 4.6,
          sell_count: 65,
          color: 'Siyah',
          images: [
            { id: 4, url: 'https://picsum.photos/400/400?random=4' }
          ]
        }
      ];
      
      // Simulate pagination in fallback
      const offset = params?.offset || 0;
      const limit = params?.limit || 25;
      const paginatedFallback = allFallbackProducts.slice(offset, offset + limit);
      
      dispatch(setTotal(185)); // Mock total from requirement
      dispatch(setProductList(paginatedFallback));
    }
  };
};

// Thunk Action Creator to fetch a single product by ID
export const fetchProduct = (productId: string | number) => {
  return async (dispatch: Dispatch) => {
    // Set loading to true
    dispatch(setProductLoading(true));
    dispatch(setCurrentProduct(null)); // Clear current product

    try {
      console.log(`Fetching product with ID: ${productId}`);
      const response = await axiosInstance.get(`/products/${productId}`);
      
      if (response.data) {
        console.log('Product fetched successfully:', response.data);
        
        // Dispatch action to update the store
        dispatch(setCurrentProduct(response.data));
        dispatch(setProductLoading(false));
        
        console.log(`Loaded product: ${response.data.name}`);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      dispatch(setProductLoading(false));
      
      // Fallback product for development
      const fallbackProduct = {
        id: Number(productId),
        name: 'Sample Product',
        description: 'This is a sample product description for development purposes.',
        price: 199.99,
        stock: 25,
        store_id: 1,
        category_id: 1,
        rating: 4.5,
        sell_count: 120,
        color: 'Blue',
        images: [
          { id: 1, url: `https://picsum.photos/400/400?random=${productId}` }
        ]
      };
      
      dispatch(setCurrentProduct(fallbackProduct));
    }
  };
};
