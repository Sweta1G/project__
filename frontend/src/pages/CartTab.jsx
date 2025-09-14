import React from "react";
import "../components/ProductCard.css";

const CartTab = ({ cartProducts, onConfirmPurchase }) => {
  const handleRemoveFromCart = (productId) => {
    let cartArr = localStorage.getItem("cartProducts");
    cartArr = cartArr ? JSON.parse(cartArr) : [];
    cartArr = cartArr.filter((p) => p.id !== productId);
    localStorage.setItem("cartProducts", JSON.stringify(cartArr));
    window.dispatchEvent(new Event("cartProductsUpdated"));
  };
  const handleConfirmPurchase = () => {
    // Move all cart items to order history with date and dummy location
    let cartArr = localStorage.getItem("cartProducts");
    cartArr = cartArr ? JSON.parse(cartArr) : [];
    let orderArr = localStorage.getItem("orderHistory");
    orderArr = orderArr ? JSON.parse(orderArr) : [];
    const now = new Date().toLocaleString();
    const location = localStorage.getItem("userLocation") || "Bangalore, India";
    const ordersWithMeta = cartArr.map(p => ({ ...p, orderDate: now, location, delivered: true }));
    orderArr = [...orderArr, ...ordersWithMeta];
    localStorage.setItem("orderHistory", JSON.stringify(orderArr));
    localStorage.setItem("cartProducts", JSON.stringify([]));
    window.dispatchEvent(new Event("cartProductsUpdated"));
    window.dispatchEvent(new Event("orderHistoryUpdated"));
    window.dispatchEvent(new CustomEvent("dnaUpdate", { detail: ordersWithMeta }));
    alert("Purchase confirmed! Your DNA profile will be updated.");
  };
  return (
    <div className="like-tab-container">
      <h1 className="like-tab-title">Your Cart</h1>
      <div className="like-tab-grid">
        {cartProducts.length === 0 ? (
          <p style={{textAlign: 'center', color: '#888', fontSize: '1.2rem'}}>Your cart is empty.</p>
        ) : (
          cartProducts.map((product) => (
            <div key={product.id}>
              <div className="product-card">
                <div className="image-container">
                  <img src={product.image_url} alt={product.type} className="product-img" />
                  <button className="wishlist-btn liked" onClick={() => handleRemoveFromCart(product.id)} title="Remove from cart">🗑️</button>
                </div>
                <div className="product-info">
                  <h2 className="product-title highlight-main">{product.name || product.type}</h2>
                  <p className="product-desc">{product.description}</p>
                  <div className="product-tags">
                    {product.tags && product.tags.map((tag, i) => (
                      <span className="tag" key={i}>{tag}</span>
                    ))}
                  </div>
                  <div className="rating-price">
                    <p className="product-price">₹{product.price.toLocaleString()}</p>
                    <div className="product-rating">
                      <span className="star">⭐</span> <span className="rating-num">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {cartProducts.length > 0 && (
        <div style={{textAlign: 'center', marginTop: '2rem'}}>
          <button className="buy-btn" style={{fontSize: '1.2rem', padding: '12px 36px'}} onClick={handleConfirmPurchase}>
            Confirm Purchase
          </button>
        </div>
      )}
    </div>
  );
};

export default CartTab;
