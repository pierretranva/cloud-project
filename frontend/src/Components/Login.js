import React, { useState } from 'react';
import axios from 'axios';
const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/db/user/login', {username:username, password: password}).then(
            (res) =>{
                console.log(res.data)
                props.handleSignIn(res.data)
            }
        ).catch((err)=>{
            // console.log(err.response.data)
            setError(err.response.data)
        })
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form style={{ width: '300px', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)' }} onSubmit={handleSubmit}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px', display: 'block' }}>Username:</label>
                    <input style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px', display: 'block' }}>Password:</label>
                    <input style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button style={{ width: '100%', padding: '10px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }} type="submit">Login</button>
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
