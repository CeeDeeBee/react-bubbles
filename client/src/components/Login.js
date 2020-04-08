import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
	const history = useHistory();
	const [error, setError] = useState(false);
	const [formValues, setFormValues] = useState({
		username: "",
		password: ""
	});

	const handleChange = e => {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value
		});
	};

	// make a post request to retrieve a token from the api
	// when you have handled the token, navigate to the BubblePage route
	const handleSubmit = e => {
		e.preventDefault();
		axios
			.post("http://localhost:5000/api/login", formValues)
			.then(res => {
				localStorage.setItem("token", JSON.stringify(res.data.payload));
				history.push("/bubbles");
			})
			.catch(err =>
				err.response.status === 403
					? setError("Incorrect Username or Password")
					: setError(`Error: ${err.response.status} ${err.response.statusText}`)
			);
	};

	return (
		<div className="login-wrapper">
			<div className="login-card">
				<h1>Welcome to the Bubble App!</h1>
				{error && (
					<div className="error">
						<p>{error}</p>
					</div>
				)}
				<div className="login-form">
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							name="username"
							placeholder="Username"
							value={formValues.username}
							onChange={handleChange}
						/>
						<input
							type="password"
							name="password"
							placeholder="Password"
							value={formValues.password}
							onChange={handleChange}
						/>
						<button type="submit">Login</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
