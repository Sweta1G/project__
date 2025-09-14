// import React from "react";
// import "./Login.css";

// const Login = () => {
// 	return (
// 		<div className="login-container">
// 			<h1>Login</h1>
// 			<input placeholder="Email" />
// 			<input
// 				placeholder="Password"
// 				type="password"
// 			/>
// 			<button>Login</button>
// 		</div>
// 	);
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	// const handleLogin = async () => {
	// 	try {
	// 		const res = await axios.post("http://localhost:5000/api/auth/login", {
	// 			email: email.trim().toLowerCase(),
	// 			password,
	// 		});

	// 		// Save token in localStorage
	// 		localStorage.setItem("token", res.data.token);
	// 		localStorage.setItem("username", res.data.username);

	// 		// Redirect to home page
	// 		navigate("/");
	// 	} catch (err) {
	// 		setError(err.response?.data?.error || "Login failed");
	// 	}
	// };

	const handleLogin = async () => {
		try {
			const res = await axios.post("http://localhost:5000/api/auth/login", {
				email: email.trim().toLowerCase(),
				password,
			});

			// Save token in localStorage
			localStorage.setItem("token", res.data.token);
			localStorage.setItem("username", res.data.username);

			// Redirect to home page
			navigate("/");
		} catch (err) {
			setError(err.response?.data?.error || "Login failed");
		}
	};

	return (
		<div className="login-container">
			<h1>Login</h1>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={handleLogin}>Login</button>
			{error && <p className="error">{error}</p>}
		</div>
	);
};

export default Login;
