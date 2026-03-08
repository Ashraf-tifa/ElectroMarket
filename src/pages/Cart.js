import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/action";
import "./Cart.css";

const Cart = () => {
  const cart = useSelector((state) => state.cart); // جلب بيانات السلة من Redux
  const dispatch = useDispatch();

  // حساب المجموع الكلي للسلة
  const totalPrice = cart.reduce(
    (total, item) => total + item.prix * (item.quantity || 1),
    0
  );

  // تكلفة التوصيل
  const [deliveryLocation, setDeliveryLocation] = useState("inside"); // الافتراضي داخل الناظور
  
  const deliveryFee = deliveryLocation === "inside" ? 20 : 50; // 20 DH داخل الناظور، 50 DH خارج الناظور

  // مكان الدفع
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery"); 
  const [cardNumber, setCardNumber] = useState(""); 

  // زيادة الكمية
  const incrementQuantity = (id) => {
    const item = cart.find((prod) => prod.id === id);
    if (item) {
      dispatch(updateQuantity(id, item.quantity + 1));
    }
  };

  // تقليل الكمية
  const decrementQuantity = (id) => {
    const item = cart.find((prod) => prod.id === id);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity(id, item.quantity - 1));
    }
  };

  // التعامل مع إدخال الكمية يدويًا
  const handleQuantityChange = (id, value) => {
    const quantity = parseInt(value) || 1; // لا تقل الكمية عن 1
    dispatch(updateQuantity(id, quantity));
  };

  // تغيير مكان التوصيل
  const handleDeliveryChange = (e) => {
    setDeliveryLocation(e.target.value);
  };

  // تغيير طريقة الدفع
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
    if (e.target.value !== "creditCard") {
      setCardNumber(""); // مسح رقم البطاقة إذا تم اختيار طريقة أخرى
    }
  };

  // التعامل مع إتمام الدفع
  const handlePayment = () => {
    alert("Votre paiement a été effectué avec succès!");
  };

  return (
    <div className="cart-container">
      <h1>Panier</h1>
      {cart.length > 0 ? (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price (DH)</th>
                <th>Quantity</th>
                <th>Total (DH)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={process.env.PUBLIC_URL + item.image} alt={item.nom} className="cart-item-image" />
                  </td>
                  <td>{item.nom}</td>
                  <td>{item.prix} DH</td>
                  <td>
                    <div className="quantity-container">
                      <button onClick={() => decrementQuantity(item.id)} className="quantity-btn">-</button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        className="quantity-input"
                        min="1"
                      />
                      <button onClick={() => incrementQuantity(item.id)} className="quantity-btn">+</button>
                    </div>
                  </td>
                  <td>{item.prix * item.quantity} DH</td>
                  <td>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))} className="remove-btn">
                      <img src = {process.env.PUBLIC_URL + "/12.png"} alt="Remove Item" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

{/* اختيار مكان التوصيل */}
<div className="delivery-section">
  <h2>Options de Livraison</h2>
  <div className="delivery-options">
    <div className={`delivery-option ${deliveryLocation === "inside" ? "selected" : ""}`} 
    onClick={() => handleDeliveryChange({ target: { value: "inside" } })}>

      <input type="radio" name="delivery" value="inside"  checked={deliveryLocation === "inside"} 
        onChange={handleDeliveryChange}
      />
      <label>À l'intérieur de Nador</label>
      <span className="delivery-fee">(20 DH)</span>
    </div>
    <div className={`delivery-option ${deliveryLocation === "outside" ? "selected" : ""}`} 
    onClick={() => handleDeliveryChange({ target: { value: "outside" } })}>
      <input 
        type="radio" 
        name="delivery" 
        value="outside" 
        checked={deliveryLocation === "outside"} 
        onChange={handleDeliveryChange}
      />
      <label>À l'extérieur de Nador</label>
      <span className="delivery-fee">(50 DH)</span>
    </div>
  </div>
</div>

{/* ملخص السلة */}
<div className="cart-summary">
  <h2>Résumé du Panier</h2>
  <div className="summary-item">
    <span className="label">Sous-total:</span>
    <span className="value">{totalPrice} DH</span>
  </div>
  <div className="summary-item">
    <span className="label">Frais de livraison:</span>
    <span className="value">{deliveryFee} DH</span>
  </div>
  <div className="summary-total">
    <h2>
      <span className="label">Total:</span>
      <span className="value">{totalPrice + deliveryFee} DH</span>
    </h2>
  </div>
</div>


          {/* قسم الدفع */}
          {/* <div className="payment-section">
            <h2>Options de Paiement</h2>
            <label>
              <input 
                type="radio" 
                name="payment" 
                value="cashOnDelivery" 
                checked={paymentMethod === "cashOnDelivery"} 
                onChange={handlePaymentChange}
              />
              Paiement à la livraison
            </label>
            <label>
              <input 
                type="radio" 
                name="payment" 
                value="creditCard" 
                checked={paymentMethod === "creditCard"} 
                onChange={handlePaymentChange}
              />
              Paiement par carte bancaire
            </label> */}

            {/* إذا تم اختيار الدفع بالبطاقة، نعرض حقل إدخال رقم البطاقة */}
            {/* {paymentMethod === "creditCard" && (
              <div>
                <label>Numéro de carte</label>
                <input 
                  type="text" 
                  value={cardNumber} 
                  onChange={(e) => setCardNumber(e.target.value)} 
                  placeholder="Entrez votre numéro de carte"
                />
              </div>
            )}

            <button className="payment-btn" onClick={handlePayment}>
              Confirmer et Payer
            </button>
          </div> */}
        </>
      ) : (
        <p className="empty-cart">Votre panier est vide !</p>
      )}
    </div>
  );
};

export default Cart;
