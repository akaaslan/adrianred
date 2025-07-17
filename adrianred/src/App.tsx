import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import HomePage from './pages/HomePage';
import ProductCard from './components/ProductCard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      
      <div className="page-content">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/product" component={ProductCard} />
        </Switch>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
