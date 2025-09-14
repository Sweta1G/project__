import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import myntraLogo from "../assets/myntra-logo.png";
import { FaUserCircle, FaShoppingBag, FaHeart, FaSignOutAlt, FaHistory } from "react-icons/fa";

const categories = [
	"Men",
	"Women",
	"Kids",
	"Home & Living",
	"Beauty"
];

const Navbar = ({ onSearch, selectedCategory, setSelectedCategory, showLikeTab, setShowLikeTab, showCartTab, setShowCartTab }) => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [likedProducts, setLikedProducts] = useState(() => {
		const stored = localStorage.getItem("likedProducts");
		return stored ? JSON.parse(stored) : [];
	});
	const [cartProducts, setCartProducts] = useState(() => {
		const stored = localStorage.getItem("cartProducts");
		return stored ? JSON.parse(stored) : [];
	});
	const isLoggedIn = Boolean(localStorage.getItem("token"));

	// Listen for localStorage changes (from like/unlike)
	useEffect(() => {
		const syncLikes = () => {
			const stored = localStorage.getItem("likedProducts");
			setLikedProducts(stored ? JSON.parse(stored) : []);
		};
		window.addEventListener("storage", syncLikes);
		window.addEventListener("likedProductsUpdated", syncLikes);
		return () => {
			window.removeEventListener("storage", syncLikes);
			window.removeEventListener("likedProductsUpdated", syncLikes);
		};
	}, []);

	useEffect(() => {
		const syncCart = () => {
			const stored = localStorage.getItem("cartProducts");
			setCartProducts(stored ? JSON.parse(stored) : []);
		};
		window.addEventListener("cartProductsUpdated", syncCart);
		return () => {
			window.removeEventListener("cartProductsUpdated", syncCart);
		};
	}, []);

	const handleChange = (e) => {
		const value = e.target.value;
		setSearchTerm(value);
		onSearch(value);
	};

	const handleCategoryClick = (cat) => {
		setSelectedCategory(cat);
		onSearch("");
		setSearchTerm("");
		navigate(`/${cat.toLowerCase()}`);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const handleAddToCart = (product) => {
		let cartArr = localStorage.getItem("cartProducts");
		cartArr = cartArr ? JSON.parse(cartArr) : [];
		if (!cartArr.some((p) => p.id === product.id)) {
			cartArr.push(product);
			localStorage.setItem("cartProducts", JSON.stringify(cartArr));
			window.dispatchEvent(new Event("cartProductsUpdated"));
		}
	};

	const handleConfirmPurchase = () => {
		// Here, update DNA profile logic (e.g., send to backend or update localStorage)
		localStorage.setItem("cartProducts", JSON.stringify([]));
		window.dispatchEvent(new Event("cartProductsUpdated"));
		alert("Purchase confirmed! Your DNA profile will be updated.");
	};

	return (
		<>
		<nav className="navbar myntra-navbar">
			 <div className="navbar-left">
				 <Link to="/">
					 <img src={myntraLogo} alt="Myntra Logo" className="myntra-logo" style={{height: '48px', width: 'auto', objectFit: 'contain', display: 'block', margin: '0 0.7rem 0 0'}} />
				 </Link>
				 <ul className="category-menu">
					 {categories.map((cat) => (
						 <li key={cat} className={`category-item${selectedCategory === cat ? " active" : ""}`}>
							 <button className="category-btn" onClick={() => handleCategoryClick(cat)}>{cat}</button>
						 </li>
					 ))}
					 <li className="category-item">
						 <Link to="/feed" className="category-btn" style={{color: '#ff3f6c', fontWeight: 700}}>Video Feed</Link>
					 </li>
				 </ul>
			 </div>
			 <div className="search-box">
				 <input
					 type="text"
					 placeholder="Search for products, brands and more"
					 value={searchTerm}
					 onChange={handleChange}
				 />
			 </div>
			 <div className="navbar-icons">
				 <button className="icon-link" onClick={() => { setShowLikeTab(true); navigate('/like'); }}>
					 <FaHeart />
					 <span>Like</span>
				 </button>
				 <Link to="/profileDNA" className="icon-link">
					 <FaUserCircle />
					 <span>Profile</span>
				 </Link>
				 <button className="icon-link" onClick={() => { setShowCartTab(true); navigate('/bag'); }}>
					 <FaShoppingBag />
					 <span>Bag</span>
				 </button>
				 <Link to="/orders" className="icon-link">
					 <FaHistory />
					 <span>Order History</span>
				 </Link>
				 {isLoggedIn ? (
					 <button className="nav-btn login-btn" onClick={handleLogout} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
						 <FaSignOutAlt /> Logout
					 </button>
				 ) : (
					 <>
						 <Link to="/login" className="nav-btn login-btn">Login</Link>
						 <Link to="/signup" className="nav-btn signup-btn">Sign Up</Link>
					 </>
				 )}
			 </div>
		 </nav>
		 {showLikeTab && null}
		{showCartTab && null}
		</>
	 );
};

export default Navbar;
