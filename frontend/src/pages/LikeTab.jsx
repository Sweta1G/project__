import React from "react";
import "../components/ProductCard.css";

const LikeTab = ({ likedProducts }) => {
  const handleUnlike = (productId) => {
    let likedArr = localStorage.getItem("likedProducts");
    likedArr = likedArr ? JSON.parse(likedArr) : [];
    likedArr = likedArr.filter((p) => p.id !== productId);
    localStorage.setItem("likedProducts", JSON.stringify(likedArr));
    window.dispatchEvent(new Event("likedProductsUpdated"));
  };
  return (
    <div className="like-tab-container">
      <h1 className="like-tab-title">Liked Products</h1>
      <div className="like-tab-grid">
        {likedProducts.length === 0 ? (
          <p style={{textAlign: 'center', color: '#888', fontSize: '1.2rem'}}>No liked products yet.</p>
        ) : (
          likedProducts.map((product) => (
            <div key={product.id}>
              <div className="product-card">
                <div className="image-container">
                  <img src={product.image_url} alt={product.type} className="product-img" />
                  <button className="wishlist-btn liked" onClick={() => handleUnlike(product.id)} title="Unlike">💔</button>
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
    </div>
  );
};

export default LikeTab;
