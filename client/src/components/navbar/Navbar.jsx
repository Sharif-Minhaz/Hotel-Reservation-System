import React from "react";
import "./navbar.css";

const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="navContainer">
				<span className="logo">HotelBooking</span>
				<div className="navItems">
					<button className="navButton">Register</button>
					<button className="navButton">Login</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
