import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import HomePage from './pages/HomePage';

import ProductList from './components/ProductList';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import PageLoader from './components/PageLoader';
import ShopPage from './pages/ShopPage';

function App() {  
  return (
    <Router>
      <LoaderWrapper />
      <Header />
      <div className="page-content">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
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
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, [location]);
  return loading ? <PageLoader /> : null;
}

export default App;
