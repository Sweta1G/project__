import React from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import "./Home.css";

const ProductGrid = ({ filterCategory, searchTerm }) => {
  let filtered = products;
  if (filterCategory) {
    filtered = products.filter(
      (p) =>
        p.category &&
        p.category.toLowerCase().includes(filterCategory.toLowerCase())
    );
  }
  if (searchTerm) {
    filtered = filtered.filter(
      (p) =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  return (
    <div className="like-tab-container">
      <h1 className="like-tab-title">{filterCategory ? filterCategory : "All Products"}</h1>
      <div className="like-tab-grid">
        {filtered.length === 0 ? (
          <p style={{textAlign: 'center', color: '#888', fontSize: '1.2rem'}}>No products found.</p>
        ) : (
          filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
