import React, { useState } from 'react';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const hardcodedCredentials = {
        email: 'user@example.com',
        password: 'password123' 
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === hardcodedCredentials.email && password === hardcodedCredentials.password) {
            alert('Logged in successfully');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Register;
