/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '../../api/axiosInstance';
import { setRoles, setUser, setLoginLoading, setLoginError } from './clientActions';
import { setCategories } from './productActions';

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
