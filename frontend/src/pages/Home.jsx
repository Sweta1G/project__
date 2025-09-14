import React, { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import "./Home.css";
import axios from "axios";

const heroBanners = [
	{
		img: "/banner-homepage.jpg",
		alt: "Big Fashion Festival Early Bird Days",
	},
];

const dealsOfDay = [
	{
		img: "https://cdn.grabon.in/gograbon/images/deal/1709010036198/myntra-floral-printed-kurta-with-trousers.JPG",
		label: "Flat 60% Off",
	},
	{
		img: "https://cdn.grabon.in/gograbon/images/deal/1716268607168/myntra-floral-printed-kurta-with-trousers-dupatta.JPG",
		label: "Buy 1 Get 1",
	},
	{
		img: "https://cdn.grabon.in/gograbon/images/deal/1718616327602/myntra-women-floral-embroidered-kurta-with-trousers.JPG",
		label: "Under ₹499",
	},
	{
		img: "https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/11382258/2020/2/25/2499c5f8-51eb-4cf1-b137-ee5827a3a6a11582616415424-Ginni-Arora-Label-Women-Grey--Red-Printed-Straight-Kurta-674-1.jpg",
		label: "Extra 20% Off",
	},
];

const topCategories = [
	{
		name: "Men",
		img: "https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/17963710/2022/4/21/b047abdf-6187-4e0d-82a5-530ef11a831d1650515511097HERENOWMenGreenSlimFitCasualShirt1.jpg",
	},
	{
		name: "Women",
		img: "https://c.ndtvimg.com/2024-03/4bkljffo_womens-clothes_625x300_19_March_24.jpeg",
	},
	{
		name: "Kids",
		img: "https://rukminim1.flixcart.com/image/612/612/xif0q/kids-ethnic-set/q/0/v/5-6-years-kids-ethnic-set-mehzin-original-imag74mekk7s32ca.jpeg?q=70",
	},
	// {
	// 	name: "Home & Living",
	// 	img: "https://tse3.mm.bing.net/th/id/OIP.9nsF4PmuCHQgwQ0I5OLssAHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
	// },
	{
		name: "Beauty",
		img: "https://img-cdn.thepublive.com/fit-in/1920x1080/filters:format(webp)/elle-india/media/post_attachments/wp-content/uploads/2023/02/Untitled-design-11.png",
	},
];

const categoryMap = {
	Men: ["streetwear", "formal", "casual", "ethnic", "athleisure", "minimal"],
	Women: ["chic", "retro", "boho", "party", "ethnic", "minimal", "athleisure"],
	Kids: ["casual", "party", "ethnic", "athleisure"],
	"Home & Living": ["home", "living"],
	Beauty: ["beauty"],
};

const premiumOffers = [
	{
		img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
		brand: "CHEMISTRY",
		offer: "MIN. 70% OFF",
		desc: "Subtle Elegance",
	},
	{
		img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
		brand: "HOUSE OF PATAUDI",
		offer: "MIN. 60% OFF",
		desc: "Royal Roots",
	},
	{
		img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
		brand: "Sangria",
		offer: "MIN. 75% OFF",
		desc: "Regal Allure",
	},
	{
		img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
		brand: "FRENCH CONNECTION",
		offer: "MIN. 60% OFF",
		desc: "Sophisticated Styles",
	},
	{
		img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
		brand: "taavi",
		offer: "MIN. 60% OFF",
		desc: "Classic Weaves",
	},
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
			await axios.post(
				"http://localhost:5000/api/purchase",
				{ productId: product.id },
				{
					headers: { "x-auth-token": token },
				}
			);
			setCart([...cart, product]);
			alert(`${product.type} added to your purchases!`);
		} catch (err) {
			alert("Purchase failed. Try again.");
		}
	};

	// Filter by category and search
	let filteredProducts = products;
	if (selectedCategory && categoryMap[selectedCategory]) {
		filteredProducts = filteredProducts.filter((p) =>
			categoryMap[selectedCategory].includes(p.category.toLowerCase())
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
				<a
					href="https://www.myntra.com/mfb-brands"
					target="_blank"
					rel="noopener noreferrer">
					<img
						src={heroBanners[0].img}
						alt={heroBanners[0].alt}
						className="hero-img"
						style={{ cursor: "pointer" }}
					/>
				</a>
				<div className="sparkle" />
				<div className="sparkle sparkle2" />
			</div>
			<div className="scroll-section">
				<h2>Deals of the Day</h2>
				<div className="scroll-row">
					{dealsOfDay.map((deal, i) => (
						<div
							className="scroll-card"
							key={i}
							style={{ position: "relative" }}>
							<img
								src={deal.img}
								alt={deal.label}
								className="scroll-img"
							/>
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
						<div
							className="scroll-card"
							key={cat.name}
							style={{ position: "relative" }}>
							<img
								src={cat.img}
								alt={cat.name}
								className="scroll-img"
							/>
							<span className="scroll-label">{cat.name}</span>
							<div className="sparkle" />
							<div className="sparkle sparkle2" />
						</div>
					))}
				</div>
			</div>
			<div className="scroll-section">
				<div
					style={{
						display: "flex",
						gap: "0.5rem",
						overflowX: "auto",
						padding: "0.5rem 0",
					}}>
					{premiumOffers.map((item, i) => (
						<div
							className="premium-card"
							key={i}>
							<img
								src={item.img}
								alt={item.brand}
								className="premium-card-img"
							/>
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
					<p className="no-results">
						No products found for "{searchTerm || selectedCategory}"
					</p>
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
