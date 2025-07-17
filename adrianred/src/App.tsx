import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import HomePage from './pages/HomePage';
import ProductCard from './components/ProductCard';
import ProductList from './components/ProductList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* Use location to set header theme */}
      <Route render={({ location }) => (
        <Header theme={location.pathname === '/product' ? 'light' : 'dark'} />
      )} />
      <div className="page-content">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/product" component={ProductList} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
