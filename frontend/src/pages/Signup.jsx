import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");

		// fake signup flow
		if (!formData.username || !formData.email || !formData.password) {
			setError("All fields are required!");
			return;
		}

		// Save dummy token
		localStorage.setItem("token", "dummy-token");
		localStorage.setItem("username", formData.username);

		alert("Signup successful!");
		navigate("/"); // redirect to Home after signup
	};

	return (
		<div className="signup-container">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="username"
					placeholder="Full Name"
					value={formData.username}
					onChange={handleChange}
					required
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<button type="submit">Sign Up</button>
			</form>

			{error && <p className="error">{error}</p>}

			<div className="login-link">
				Already have an account? <Link to="/login">Login here</Link>
			</div>
		</div>
	);
}

export default Signup;