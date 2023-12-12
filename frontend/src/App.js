import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Navbar.js";
import Explore from "./Components/Explore";
import UserProfile from "./Components/Profile";
import MapPage from "./Components/MapPage";
import About from "./Components/About.js";
import Login from "./Components/Login";
import Register from "./Components/Register";

const App = () => {
	const [ageRange, setAgeRange] = useState([20, 80]);
	const [selectedTags, setSelectedTags] = useState([]);
	const [signedIn, setSignedIn] = useState(false);
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

    //check to see if user login info is stored in local storage
	useEffect(() => {
		if (Object.keys(localStorage).includes("user")) {
			setSignedIn(true);
			setUser(JSON.parse(localStorage.getItem("user")));
		}
	}, []);

	const handleSignIn = (currentUser) => {
		setUser(currentUser);
		setSignedIn(true);
		localStorage.setItem("user", JSON.stringify(currentUser));
		navigate("/profile");
	};
	const handleLogout = () => {
		setUser(null);
		setSignedIn(false);
		localStorage.clear();
	};

	const handleRegisterSuccess = (user) => {
		setUser(user);
		setSignedIn(true);
		localStorage.setItem("user", JSON.stringify(user));
		navigate("/profile");
	};

	return (
		<>
			<Navbar signedIn={signedIn} handleSignIn={handleSignIn} handleLogout={handleLogout} />
			<Routes>
				<Route path="/" element={<About />} />
				<Route path="about" element={<About />} />
				<Route
					path="explore"
					element={<Explore ageRange={ageRange} setAgeRange={setAgeRange} setSelectedTags={setSelectedTags} />}
				/>
				<Route path="map" element={<MapPage user={user} />} />
				<Route
					path="profile"
					element={
						signedIn ? <UserProfile user={user} ageRange={ageRange} selectedTags={selectedTags} /> : <Navigate to="/" />
					}
				/>
				<Route path="login" element={<Login handleSignIn={handleSignIn} />} />
				<Route path="register" element={<Register onRegisterSuccess={handleRegisterSuccess} />} />
			</Routes>
		</>
	);
};

export default App;
