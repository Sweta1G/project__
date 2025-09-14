import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProfileDNA from "./pages/ProfileDNA";
import Signup from "./pages/Signup";
import VideoFeed from "./pages/VideoFeed";
import ProductGrid from "./pages/ProductGrid";
import LikeTab from "./pages/LikeTab";
import CartTab from "./pages/CartTab";
import OrderHistory from "./pages/OrderHistory";

// PrivateRoute wrapper
const PrivateRoute = ({ children }) => {
	const token = localStorage.getItem("token");
	return token ? children : <Navigate to="/login" />;
};

const App = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [showLikeTab, setShowLikeTab] = useState(false);
	const [showCartTab, setShowCartTab] = useState(false);
	const [orders, setOrders] = useState(() => {
		const stored = localStorage.getItem("orderHistory");
		return stored ? JSON.parse(stored) : [];
	});

	return (
		<Router>
			<Navbar
				onSearch={setSearchTerm}
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
				showLikeTab={showLikeTab}
				setShowLikeTab={setShowLikeTab}
				showCartTab={showCartTab}
				setShowCartTab={setShowCartTab}
			/>
			<Routes>
				<Route
					path="/"
					element={
						<PrivateRoute>
							<Home searchTerm={searchTerm} selectedCategory={selectedCategory} />
						</PrivateRoute>
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route
					path="/profileDNA"
					element={
						<PrivateRoute>
							<ProfileDNA />
						</PrivateRoute>
					}
				/>
				<Route path="/feed" element={<VideoFeed />} />
				<Route path="/like" element={<LikeTab likedProducts={JSON.parse(localStorage.getItem('likedProducts')||'[]')} />} />
				<Route path="/bag" element={<CartTab cartProducts={JSON.parse(localStorage.getItem('cartProducts')||'[]')} onConfirmPurchase={()=>{}} />} />
				<Route path="/orders" element={<OrderHistory orders={orders} />} />
				{["men","women","kids","home","beauty"].map(cat => (
					<Route key={cat} path={`/${cat}`} element={<ProductGrid filterCategory={cat} searchTerm={searchTerm} />} />
				))}
			</Routes>
			<Footer />
		</Router>
	);
};

export default App;