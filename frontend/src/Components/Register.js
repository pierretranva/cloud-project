import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

const Register = (props) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const navigate = useNavigate();

	const hardcodedCredentials = {
		email: "user@example.com",
		password: "password123",
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:3000/db/user/register/", { username: username, password: password })
			.then((res) => {
				console.log(res);
				setSuccess("Successfully Created New Account");
				props.onRegisterSuccess(res.data);
			})
			.catch((err) => {
				setError(err.response.data);
			});
	};
	useEffect(() => {
		setError("");
		setSuccess("");
	}, [username, password]);

	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
			<form style={{ width: '300px', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)' }}>
				<h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>
				<div style={{ marginBottom: '15px' }}>
					<label style={{ marginBottom: '5px', display: 'block' }}>Username:</label>
					<input style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} value={username} onChange={(e) => setUsername(e.target.value)} />
				</div>
				<div style={{ marginBottom: '15px' }}>
					<label style={{ marginBottom: '5px', display: 'block' }}>Password:</label>
					<input style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>
				<button style={{ width: '100%', padding: '10px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
					onClick={(e) => {
						handleSubmit(e);
					}}
				>
					Create Account
				</button>
				{error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
				{success && <p style={{ color: "green" }}>{success}</p>}
			</form>
		</div>
	);
};

export default Register;
