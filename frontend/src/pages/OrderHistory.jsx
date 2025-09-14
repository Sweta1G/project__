import React from "react";
import "../components/ProductCard.css";

const OrderHistory = ({ orders }) => {
  return (
    <div className="like-tab-container">
      <h1 className="like-tab-title">Order History</h1>
      <div className="like-tab-grid">
        {orders.length === 0 ? (
          <p style={{textAlign: 'center', color: '#888', fontSize: '1.2rem'}}>No orders yet.</p>
        ) : (
          orders.map((product, idx) => (
            <div key={product.id + '-' + idx}>
              <div className="product-card">
                <div className="image-container">
                  <img src={product.image_url} alt={product.type} className="product-img" />
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
                  <div className="order-meta">
                    <div><b>Order Date:</b> {product.orderDate || 'N/A'}</div>
                    <div><b>Delivered to:</b> {product.location || 'N/A'}</div>
                    <div><b>Status:</b> {product.delivered ? 'Delivered' : 'Pending'}</div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
