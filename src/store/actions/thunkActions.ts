import axiosInstance from '../../api/axiosInstance';
import { setRoles } from './clientActions';

// Thunk Action Creator to get roles
import type { Dispatch } from 'redux';

// Import RootState as a type from your store file
import type { RootState } from '../store'; // Adjust the import path as needed

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
