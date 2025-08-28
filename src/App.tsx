/* eslint-disable @typescript-eslint/no-explicit-any */
import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import HomePage from './pages/HomePage';

import ProductList from './components/ProductList';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import PageLoader from './components/PageLoader';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import TeamPage from './pages/TeamPage';
import AboutPage from './pages/AboutPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import PreviousOrdersPage from './pages/PreviousOrdersPage';
import EasterEggPage from './pages/EasterEggPage';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { initializeUser, fetchCategories } from './store/actions/thunkActions';

function App() {  
  const dispatch = useDispatch();
  
  // Initialize user on app start
  useEffect(() => {
    const thunkDispatch = dispatch as any;
    thunkDispatch(initializeUser());
    thunkDispatch(fetchCategories());
  }, [dispatch]);
  
  return (
    <Router>
      <LoaderWrapper />
      <Header />
      <div className="page-content">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId" component={ProductDetailPage} />
          <Route path="/shop/:gender/:categoryName/:categoryId" component={ShopPage} />
          <Route path="/product/:id" component={ProductDetailPage} />
          <Route path="/cart" component={ShoppingCartPage} />
          <ProtectedRoute path="/checkout" component={CheckoutPage} />
          <Route path="/order-success" component={OrderSuccessPage} />
          <ProtectedRoute path="/previous-orders" component={PreviousOrdersPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/team" component={TeamPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/product" component={ProductList} />
          <Route path="/x9k2m5p8q1w3" component={EasterEggPage} />
        </Switch>
      </div>
      <Footer />
      <ToastContainer
        position={window.innerWidth < 768 ? "top-center" : "top-right"}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

function LoaderWrapper() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const isFirstLoad = React.useRef(true);
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      setLoading(false);
      return;
    }
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timeout);
  }, [location]);
  return loading ? <PageLoader /> : null;
}

export default App;
