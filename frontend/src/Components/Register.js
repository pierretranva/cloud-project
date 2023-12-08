import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = ({ onRegisterSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();


    const hardcodedCredentials = {
        email: 'user@example.com',
        password: 'password123'
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/db/user/register/', { username: username, password: password }).then(
            (res) => {
                console.log(res);
                setSuccess("Successfully Created New Account");
                onRegisterSuccess(res.data.user);
            }
        ).catch((err) => {
            setError(err.response.data);
        });

    };
    useEffect(() => {
        setError('')
        setSuccess('')
    }, [username, password])


    return (
        <div>
            <form >
                <div>
                    <label>Username:</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button onClick={(e) => { handleSubmit(e) }}>Create Account</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
            </form>
        </div>
    );
};

export default Register;
