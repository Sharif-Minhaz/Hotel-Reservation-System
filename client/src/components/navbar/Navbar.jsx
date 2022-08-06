import React, { useContext } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
	const { user } = useContext(AuthContext);
	return (
		<nav className="navbar">
			<div className="navContainer">
				<Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
					<span className="logo">HotelBooking</span>
				</Link>
				{user ? (
					user.username
				) : (
					<div className="navItems">
						<button className="navButton">Register</button>
						<button className="navButton">Login</button>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
