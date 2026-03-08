import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/action";
import products from "../data/products";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("tout");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const filteredProducts = products.filter((product) => {
    const Search = product.nom.toLowerCase().includes(search.toLowerCase());
    const Filter =
      filter === "tout" || product.brand.toLowerCase() === filter.toLowerCase();

    return Search && Filter;
  });

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      alert(`Produit déjà dans le panier`);
    } else {
      dispatch(addToCart({ ...product, quantity: 1 }));
      alert(`Ajouter ${product.nom} dans le panier.`);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="store-header">
        <h1>ElectroMarket Store</h1>
        <p>Welcome to our online store!</p>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Rechercher des produits"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="search-input"
          />
          <img src="/search.png" alt="search" className="search-icon" />
        </div>

        <div className="filter-container">
          <input
            type="radio"
            id="tout"
            name="brandFilter"
            value="tout"
            checked={filter === "tout"}
            onChange={(e) => setFilter(e.target.value)}
          />
          <label htmlFor="tout">Tout</label>

          <input
            type="radio"
            id="hp"
            name="brandFilter"
            value="hp"
            checked={filter === "hp"}
            onChange={(e) => setFilter(e.target.value)}
          />
          <label htmlFor="hp">HP</label>

          <input
            type="radio"
            id="dell"
            name="brandFilter"
            value="dell"
            checked={filter === "dell"}
            onChange={(e) => setFilter(e.target.value)}
          />
          <label htmlFor="dell">DELL</label>

          <input
            type="radio"
            id="lenovo"
            name="brandFilter"
            value="lenovo"
            checked={filter === "lenovo"}
            onChange={(e) => setFilter(e.target.value)}
          />
          <label htmlFor="lenovo">LENOVO</label>
        </div>
      </div>

      {/* Products Grid */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={"/product/" + product.id}>
                <img
                  src={product.image}
                  alt={product.nom}
                  className="product-image"
                />
                <h2>{product.nom}</h2>
                <p>
                  <strong>Prix:</strong> {product.prix} DH
                </p>
              </Link>
              <button onClick={() => handleAddToCart(product)}>
                Ajouter dans le panier
              </button>
            </div>
          ))
        ) : (
          <p>Aucun produit trouvé</p>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <h3>Follow Us</h3>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
        <div className="footer-text">
          <p>© 2023 ElectroMarket Store. Tous droits réservés.</p>
          <a href="#">Conditions d'utilisation</a>
          <a href="#">Politique de confidentialité</a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
