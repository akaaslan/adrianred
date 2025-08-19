import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/types';
import { setTheme, setUser } from '../store';

const TestRedux: React.FC = () => {
  const dispatch = useDispatch();
  const client = useSelector((state: RootState) => state.client);

  const handleThemeToggle = () => {
    const newTheme = client.theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };

  const handleLogin = () => {
    dispatch(setUser({ id: 1, name: 'Test User', email: 'test@example.com' }));
  };

  const handleLogout = () => {
    dispatch(setUser({}));
  };

  const isLoggedIn = client.user && Object.keys(client.user).length > 0;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-bold mb-4">Redux Test</h3>
      
      <div className="space-y-2 mb-4">
        <p><strong>Theme:</strong> {client.theme}</p>
        <p><strong>User:</strong> {isLoggedIn ? client.user.name : 'Not logged in'}</p>
        <p><strong>Roles Count:</strong> {client.roles.length}</p>
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={handleThemeToggle}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Toggle Theme
        </button>
        
        {!isLoggedIn ? (
          <button 
            onClick={handleLogin}
            className="px-3 py-1 bg-green-500 text-white rounded"
          >
            Test Login
          </button>
        ) : (
          <button 
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Test Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default TestRedux;
