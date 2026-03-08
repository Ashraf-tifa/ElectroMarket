import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/action";
import products from "../data/products";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [product] = useState(() =>
    products.find((prod) => prod.id === parseInt(id, 10)) || null
  );

  const [quantity, setQuantity] = useState(1);

  // Commentaire:
  const [newComment, setNewComment] = useState("");

  const usernames = [
    "Ashraf",
    "Toufik",
    "maryam",
    "Dina",
    "Wiame",
    "Fatine",
    "Oumaima",
    "Mohammed",
  ];

  const getRandomUsername = () => {
    const randomIndex = Math.floor(Math.random() * usernames.length);
    return usernames[randomIndex];
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const comment = {
      id: product.comments?.length + 1 || 1,
      username: getRandomUsername(),
      text: newComment,
    };

    if (product.comments) {
      product.comments.push(comment);
    } else {
      product.comments = [comment];
    }
    setNewComment("");
  };

  const handleQuantityChange = (e) => setQuantity(Number(e.target.value));
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      alert(`Produit déjà dans le panier`);
    } else {
      dispatch(addToCart({ ...product, quantity }));
      alert(`Ajouter ${quantity} de ${product.nom} dans le panier.`);
    }
  };

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-details-container">
      <div className="product-details">
        <img src={product.image} alt={product.nom} className="product-details-image"/>

        <div className="product-details-info">
          <h1>{product.nom}</h1>
          <p>
            <strong>Brand:</strong> {product.brand}
          </p>
          <p>
            <strong>Price:</strong> {product.prix} DH
          </p>
          <h3>Description:</h3>
          {Array.isArray(product.description) ? (
            <ul>
              {product.description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{product.description}</p>
          )}

          <div className="quantity-container">
            <label htmlFor="quantity">Quantity:</label>
            <div className="quantity-controls">
              <button onClick={decrementQuantity} className="quantity-btn">
                -
              </button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                className="quantity-input"
              />
              <button onClick={incrementQuantity} className="quantity-btn">
                +
              </button>
            </div>
          </div>

          <p className="total-price">Total: {product.prix * quantity} DH</p>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        <h2>Comments</h2>
        <div className="comment-input-container">
          <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} 
          placeholder="Write your comment here..."
            className="comment-input"></textarea>
          <button onClick={handleAddComment} className="add-comment-btn">
            Add Comment
          </button>
        </div>

        <div className="comments-list">
          {product.comments?.length > 0 ? (
            product.comments.map((comment) => (
              <div key={comment.id} className="comment">
                <p className="comment-username">{comment.username}:</p>
                <p className="comment-text">{comment.text}</p>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to leave a comment!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
