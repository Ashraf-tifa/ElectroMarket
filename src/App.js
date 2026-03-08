import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import { useSelector } from 'react-redux';
import Contact from './pages/contact';

function App() {
  const cart = useSelector((state) => state.cart);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="App">
      <nav>
        <Link to="/">
          <img src={process.env.PUBLIC_URL + "/ssmov.png"} alt="Store Logo" />
        </Link>
        <Link to="/">Accueil</Link>
        <Link to="#">Téléphone</Link>
        <Link to="#">Accessoire</Link>
        <Link to="/contact">Contact</Link>
        <div className="cart-icon">
          <Link to="/Cart">
            <img src={process.env.PUBLIC_URL + "/cart.png"} alt="Shopping Cart" />
          </Link>
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
