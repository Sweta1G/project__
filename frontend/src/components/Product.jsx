import React from "react";
import ProductCard from "./ProductCard";
import "./ProductCard.css";
import { products } from "../data/products";

const Product = ({ searchTerm, onBuy }) => {
	// Filter products only if searchTerm is not empty
	const filteredProducts =
		searchTerm && searchTerm.trim() !== ""
			? products.filter(
					(item) =>
						item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
						item.category.toLowerCase().includes(searchTerm.toLowerCase())
			  )
			: products; // show all if searchTerm is empty

	return (
		<div className="product-grid">
			{filteredProducts.length > 0 ? (
				filteredProducts.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						searchTerm={searchTerm}
						onBuy={onBuy}
					/>
				))
			) : (
				<p className="no-results">No products found for "{searchTerm}"</p>
			)}
		</div>
	);
};

export default Product;
