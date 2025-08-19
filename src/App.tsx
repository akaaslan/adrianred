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

function App() {  
  return (
    <Router>
      <LoaderWrapper />
      <Header />
      <div className="page-content">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/product/:id" component={ProductDetailPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/team" component={TeamPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/product" component={ProductList} />
        </Switch>
      </div>
      <Footer />
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
