import React, { useState, useEffect } from "react";
import { app } from "../firebase";
import { Link } from "react-router-dom";
import logo from "../assets/newsnow.png";
import Footer from "./Footer";
import SignupPage from "../Pages/Signup";
import LoginPage from "../Pages/Login";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const auth = getAuth(app);

function Header() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
				console.log("Hello", user);
			} else {
				setUser(null);
				console.log("You are logged out");
			}
		});
		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);

	return (
		<>
			<nav
				className="navbar navbar-expand-lg"
				style={{ backgroundColor: "#F5CC75" }}>
				<div className="container-fluid">
					<nav className="navbar">
						<div className="container-fluid">
							<Link to="/" className="navbar-brand text-black p-0 m-0">
								<img width="100" height="80" src={logo} alt="logo" />
							</Link>
						</div>
					</nav>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNavDropdown"
						aria-controls="navbarNavDropdown"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNavDropdown">
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link to="/" className="nav-link active text-black m-0">
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/tech" className="nav-link text-black">
									Technology
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/sports" className="nav-link text-black">
									Sports
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/entertainment" className="nav-link text-black">
									Entertainment
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/politics" className="nav-link text-black">
									Politics
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/business" className="nav-link text-black">
									Business
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/profile" className="nav-link text-black">
									Profile
								</Link>
							</li>
						</ul>
					</div>
					{user ? (
						<div className="text-black me-5">
							Welcome, {user.email} &nbsp;
							<button
								style={{
									backgroundColor: "red",
									borderRadius: "10px",
									width: "15vh",
									height: "5vh",
								}}
								onClick={() => signOut(auth)}>
								Logout
							</button>
						</div>
					) : (
						<button
							className="btn btn-danger text-black ms-5 me-5"
							onClick={() => (window.location.href = "/signup")}>
							Signup/Login
						</button>
					)}
				</div>
			</nav>
		</>
	);
}

export default Header;
