import React, { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import "./Home.css";
import axios from "axios";

const heroBanners = [
	{
		img: "/banner-homepage.jpg",
		alt: "Big Fashion Festival Early Bird Days"
	}
];

const dealsOfDay = [
	{ img: "/deals1.jpg", label: "Flat 60% Off" },
	{ img: "/deals2.jpg", label: "Buy 1 Get 1" },
	{ img: "/deals3.jpg", label: "Under ₹499" },
	{ img: "/deals4.jpg", label: "Extra 20% Off" }
];

const topCategories = [
	{ name: "Men", img: "/cat-men.jpg" },
	{ name: "Women", img: "/cat-women.jpg" },
	{ name: "Kids", img: "/cat-kids.jpg" },
	{ name: "Home & Living", img: "/cat-home.jpg" },
	{ name: "Beauty", img: "/cat-beauty.jpg" }
];

const categoryMap = {
	"Men": ["streetwear", "formal", "casual", "ethnic", "athleisure", "minimal"],
	"Women": ["chic", "retro", "boho", "party", "ethnic", "minimal", "athleisure"],
	"Kids": ["casual", "party", "ethnic", "athleisure"],
	"Home & Living": ["home", "living"],
	"Beauty": ["beauty"]
};

const premiumOffers = [
	{
		img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
		brand: "CHEMISTRY",
		offer: "MIN. 70% OFF",
		desc: "Subtle Elegance"
	},
	{
		img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
		brand: "HOUSE OF PATAUDI",
		offer: "MIN. 60% OFF",
		desc: "Royal Roots"
	},
	{
		img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
		brand: "Sangria",
		offer: "MIN. 75% OFF",
		desc: "Regal Allure"
	},
	{
		img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
		brand: "FRENCH CONNECTION",
		offer: "MIN. 60% OFF",
		desc: "Sophisticated Styles"
	},
	{
		img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
		brand: "taavi",
		offer: "MIN. 60% OFF",
		desc: "Classic Weaves"
	}
];

const Home = ({ searchTerm, selectedCategory }) => {
	const [cart, setCart] = useState([]);

	// Buy handler
	const handleBuy = async (product) => {
		const token = localStorage.getItem("token");
		if (!token) {
			alert("Please login to buy products.");
			return;
		}
		try {
			await axios.post("http://localhost:5000/api/purchase", { productId: product.id }, {
				headers: { "x-auth-token": token }
			});
			setCart([...cart, product]);
			alert(`${product.type} added to your purchases!`);
		} catch (err) {
			alert("Purchase failed. Try again.");
		}
	};

	// Filter by category and search
	let filteredProducts = products;
	if (selectedCategory && categoryMap[selectedCategory]) {
		filteredProducts = filteredProducts.filter(
			(p) => categoryMap[selectedCategory].includes(p.category.toLowerCase())
		);
	}
	if (searchTerm && searchTerm.trim() !== "") {
		filteredProducts = filteredProducts.filter(
			(item) =>
				item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.category.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}

	return (
		<div className="home-container">
			<div className="hero-carousel">
				<a href="https://www.myntra.com/mfb-brands" target="_blank" rel="noopener noreferrer">
					<img src={heroBanners[0].img} alt={heroBanners[0].alt} className="hero-img" style={{cursor: 'pointer'}} />
				</a>
				<div className="sparkle" />
				<div className="sparkle sparkle2" />
			</div>
			<div className="scroll-section">
				<h2>Deals of the Day</h2>
				<div className="scroll-row">
					{dealsOfDay.map((deal, i) => (
						<div className="scroll-card" key={i} style={{position: 'relative'}}>
							<img src={deal.img} alt={deal.label} className="scroll-img" />
							<span className="scroll-label">{deal.label}</span>
							<div className="sparkle" />
							<div className="sparkle sparkle2" />
						</div>
					))}
				</div>
			</div>
			<div className="scroll-section">
				<h2>Top Categories</h2>
				<div className="scroll-row">
					{topCategories.map((cat, i) => (
						<div className="scroll-card" key={cat.name} style={{position: 'relative'}}>
							<img src={cat.img} alt={cat.name} className="scroll-img" />
							<span className="scroll-label">{cat.name}</span>
							<div className="sparkle" />
							<div className="sparkle sparkle2" />
						</div>
					))}
				</div>
			</div>
			<div className="scroll-section">
				<div style={{display: 'flex', gap: '0.5rem', overflowX: 'auto', padding: '0.5rem 0'}}>
					{premiumOffers.map((item, i) => (
						<div className="premium-card" key={i}>
							<img src={item.img} alt={item.brand} className="premium-card-img" />
							<div className="premium-card-brand">{item.brand}</div>
							<div className="premium-card-offer">{item.offer}</div>
							<div className="premium-card-desc">{item.desc}</div>
						</div>
					))}
				</div>
			</div>
			<h1>Products</h1>
			<div className="product-grid">
				{filteredProducts.length > 0 ? (
					filteredProducts.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							searchTerm={searchTerm}
							onBuy={handleBuy}
						/>
					))
				) : (
					<p className="no-results">No products found for "{searchTerm || selectedCategory}"</p>
				)}
			</div>
		</div>
	);
};

export default Home;

// import React, { useState } from "react";
// import { products } from "../data/products";
// import ProductCard from "../components/ProductCard";
// import "./Home.css";
// import axios from "axios";

// const Home = ({ searchTerm }) => {
// 	const [cart, setCart] = useState([]);

// 	// Buy handler
// 	const handleBuy = async (product) => {
// 		const token = localStorage.getItem("token"); // saved during login/signup
// 		if (!token) {
// 			alert("Please login first!");
// 			return;
// 		}

// 		try {
// 			const res = await axios.post(
// 				"http://localhost:5000/api/purchases", // backend purchase route
// 				{ category: product.category }, // body
// 				{
// 					headers: { "x-auth-token": token },
// 				}
// 			);

// 			setCart([...cart, product]); // optional: keep track in local state
// 			console.log("Purchase updated:", res.data);
// 			alert(`${product.type} added! Your DNA is updating...`);
// 		} catch (err) {
// 			console.error(err);
// 			alert("Error recording purchase. Try again!");

// 		}
// 	};

// 	// Filter products by search
// 	const filteredProducts =
// 		searchTerm && searchTerm.trim() !== ""
// 			? products.filter(
// 					(product) =>
// 						product.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
// 						product.category.toLowerCase().includes(searchTerm.toLowerCase())
// 			  )
// 			: products;

// 	return (
// 		<div className="home-container">
// 			<h1>Products</h1>
// 			<div className="product-grid">
// 				{filteredProducts.length > 0 ? (
// 					filteredProducts.map((product) => (
// 						<ProductCard
// 							key={product.id}
// 							product={product}
// 							searchTerm={searchTerm}
// 							onBuy={handleBuy}
// 						/>
// 					))
// 				) : (
// 					<p className="no-results">No products found for "{searchTerm}"</p>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default Home;
