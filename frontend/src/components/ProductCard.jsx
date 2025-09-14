import React from "react";
import "./ProductCard.css";

const highlightText = (text, searchTerm) => {
	if (!searchTerm) return text;

	const regex = new RegExp(`(${searchTerm})`, "gi"); // case-insensitive match
	const parts = text.split(regex);

	return parts.map((part, index) =>
		regex.test(part) ? (
			<span
				key={index}
				className="highlight">
				{part}
			</span>
		) : (
			part
		)
	);
};

const ProductCard = ({ product, searchTerm }) => {
	const [liked, setLiked] = React.useState(() => {
		const stored = localStorage.getItem("likedProducts");
		if (!stored) return false;
		return JSON.parse(stored).some((p) => p.id === product.id);
	});

	const handleLike = () => {
		let likedArr = localStorage.getItem("likedProducts");
		likedArr = likedArr ? JSON.parse(likedArr) : [];
		if (!liked) {
			likedArr.push(product);
			localStorage.setItem("likedProducts", JSON.stringify(likedArr));
			setLiked(true);
		} else {
			likedArr = likedArr.filter((p) => p.id !== product.id);
			localStorage.setItem("likedProducts", JSON.stringify(likedArr));
			setLiked(false);
		}
		// Dispatch custom event to notify Navbar
		window.dispatchEvent(new Event("likedProductsUpdated"));
	};

	const handleAddToCart = () => {
		let cartArr = localStorage.getItem("cartProducts");
		cartArr = cartArr ? JSON.parse(cartArr) : [];
		if (!cartArr.some((p) => p.id === product.id)) {
			cartArr.push(product);
			localStorage.setItem("cartProducts", JSON.stringify(cartArr));
			window.dispatchEvent(new Event("cartProductsUpdated"));
		}
	};

	return (
		<div className="product-card">
			<div className="image-container">
				<img
					src={product.image_url}
					alt={product.type}
					className="product-img"
				/>
				<button className={`wishlist-btn${liked ? " liked" : ""}`} onClick={handleLike}>
					{liked ? "💖" : "🤍"}
				</button>
				{product.isTrending && <span className="badge">🔥 Trending</span>}
				{product.traits && (
					<span className="traits-badge">✨ {product.traits.length} traits</span>
				)}
				{product.quickAdd && (
					<button className="quick-add-btn">Quick Add</button>
				)}
			</div>

			<div className="product-info">
				<h2 className="product-title highlight-main">
					{highlightText(product.name || product.type, searchTerm)}
				</h2>
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
				<div className="product-actions">
					<button
						className="buy-btn"
						onClick={handleAddToCart}>
						Add to Bag
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
