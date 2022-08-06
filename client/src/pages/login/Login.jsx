import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./login.css";

const Login = () => {
	const [credentials, setCredentials] = useState({
		username: undefined,
		password: undefined,
	});

	const navigate = useNavigate();
	const { loading, error, dispatch } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "LOGIN_START" });
		try {
			const res = await axios.post("http://localhost:8800/api/auth/login/", {
				username: credentials.username,
				password: credentials.password,
			});
			dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
			navigate("/");
		} catch (err) {
			dispatch({ type: "LOGIN_FAILURE", payload: "Invalid username or password" });
		}
	};

	const handleChange = (e) => {
		setCredentials((prev) => {
			return { ...prev, [e.target.id]: e.target.value };
		});
	};

	return (
		<div className="login">
			<div className="lContainer">
				<input
					type="text"
					placeholder="username"
					id="username"
					onChange={handleChange}
					className="lInput"
				/>
				<input
					type="password"
					placeholder="password"
					id="password"
					onChange={handleChange}
					className="lInput"
				/>
				<button onClick={handleSubmit} disabled={loading} className="lButton">
					Login
				</button>
				{error && <span>{error}</span>}
			</div>
		</div>
	);
};

export default Login;
