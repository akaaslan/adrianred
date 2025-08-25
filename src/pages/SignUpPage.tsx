import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/types';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import { fetchRoles } from '../store';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role_id: number;
  storeName: string;
  storePhone: string;
  storeTaxNo: string;
  storeBankAccount: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function SignUpPage() {
  const dispatch = useDispatch();
  const roles = useSelector((state: RootState) => state.client.roles);
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role_id: 3,
    storeName: '',
    storePhone: '',
    storeTaxNo: '',
    storeBankAccount: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const isStoreRole = formData.role_id === 2;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Fetch roles using Redux thunk only if not already fetched
    // @ts-expect-error - thunk action typing issue
    dispatch(fetchRoles());
  }, [dispatch]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    // Email validation
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    // Password validation - Updated to accept more special characters
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordPattern.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Store-specific validations
    if (isStoreRole) {
      if (!formData.storeName.trim()) {
        newErrors.storeName = 'Store name is required';
      } else if (formData.storeName.length < 3) {
        newErrors.storeName = 'Store name must be at least 3 characters';
      }

      const phonePattern = /^(\+90|0)?[5-9][0-9]{9}$/;
      if (!formData.storePhone.trim()) {
        newErrors.storePhone = 'Store phone is required';
      } else if (!phonePattern.test(formData.storePhone.replace(/\s/g, ''))) {
        newErrors.storePhone = 'Please enter a valid Turkish phone number';
      }

      const taxNoPattern = /^T\d{4}V\d{6}$/;
      if (!formData.storeTaxNo.trim()) {
        newErrors.storeTaxNo = 'Tax number is required';
      } else if (!taxNoPattern.test(formData.storeTaxNo)) {
        newErrors.storeTaxNo = 'Tax number must match format TXXXXVXXXXXX';
      }

      const ibanPattern = /^TR\d{2}[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{2}$/;
      if (!formData.storeBankAccount.trim()) {
        newErrors.storeBankAccount = 'IBAN is required';
      } else if (!ibanPattern.test(formData.storeBankAccount.replace(/\s/g, ''))) {
        newErrors.storeBankAccount = 'Please enter a valid Turkish IBAN';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmitError('');
    setSuccessMessage('');

    try {
      interface SubmitData {
        name: string;
        email: string;
        password: string;
        role_id: number;
        store?: {
          name: string;
          phone: string;
          tax_no: string;
          bank_account: string;
        };
      }

      const submitData: SubmitData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role_id: formData.role_id,
      };

      if (isStoreRole) {
        submitData.store = {
          name: formData.storeName,
          phone: formData.storePhone,
          tax_no: formData.storeTaxNo,
          bank_account: formData.storeBankAccount,
        };
      }

      const response = await axiosInstance.post('/signup', submitData);
      
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage('Account created successfully! Please check your email to activate your account.');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          role_id: 3,
          storeName: '',
          storePhone: '',
          storeTaxNo: '',
          storeBankAccount: '',
        });
      }
    } catch (error: unknown) {
      console.error('Signup error:', error);
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        if (axiosError.response?.data?.message) {
          setSubmitError(axiosError.response.data.message);
        } else {
          setSubmitError('An error occurred during signup. Please try again.');
        }
      } else {
        setSubmitError('An error occurred during signup. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="max-w-md mx-auto mb-6 sm:mb-8 pt-16 sm:pt-16">
        <nav className="flex items-center space-x-2 text-xs sm:text-sm">
          <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="text-gray-400">&gt;</span>
          <span className="text-gray-900">Sign Up</span>
        </nav>
      </div>

      <div className="max-w-md mx-auto">
        <div className="bg-white py-6 sm:py-8 px-4 sm:px-10 shadow-lg rounded-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                sign in to your existing account
              </Link>
            </p>
          </div>

          {submitError && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {submitError}
            </div>
          )}

          {successMessage && (
            <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              {successMessage}
            </div>
          )}

          <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password *
              </label>
              <div className="mt-1 relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label htmlFor="role_id" className="block text-sm font-medium text-gray-700">
                Role *
              </label>
              <select
                id="role_id"
                name="role_id"
                value={formData.role_id}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Store Fields (conditionally rendered) */}
            {isStoreRole && (
              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Store Information</h3>
                
                {/* Store Name */}
                <div>
                  <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
                    Store Name *
                  </label>
                  <input
                    type="text"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter store name"
                  />
                  {errors.storeName && (
                    <p className="mt-1 text-sm text-red-600">{errors.storeName}</p>
                  )}
                </div>

                {/* Store Phone */}
                <div>
                  <label htmlFor="storePhone" className="block text-sm font-medium text-gray-700">
                    Store Phone *
                  </label>
                  <input
                    type="tel"
                    name="storePhone"
                    value={formData.storePhone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0555 123 45 67"
                  />
                  {errors.storePhone && (
                    <p className="mt-1 text-sm text-red-600">{errors.storePhone}</p>
                  )}
                </div>

                {/* Store Tax ID */}
                <div>
                  <label htmlFor="storeTaxNo" className="block text-sm font-medium text-gray-700">
                    Tax Number *
                  </label>
                  <input
                    type="text"
                    name="storeTaxNo"
                    value={formData.storeTaxNo}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="T1234V567890"
                  />
                  {errors.storeTaxNo && (
                    <p className="mt-1 text-sm text-red-600">{errors.storeTaxNo}</p>
                  )}
                </div>

                {/* Store Bank Account */}
                <div>
                  <label htmlFor="storeBankAccount" className="block text-sm font-medium text-gray-700">
                    IBAN *
                  </label>
                  <input
                    type="text"
                    name="storeBankAccount"
                    value={formData.storeBankAccount}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="TR12 3456 7890 1234 5678 9012 34"
                  />
                  {errors.storeBankAccount && (
                    <p className="mt-1 text-sm text-red-600">{errors.storeBankAccount}</p>
                  )}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>

            {/* Terms */}
            <div className="text-center">
              <p className="text-xs text-gray-600">
                By signing up, you agree to our{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
